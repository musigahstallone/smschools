// src/app/services/auth/auth-signal.service.ts
import { Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  deleteUser,
} from '@angular/fire/auth';
import { inject } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { User } from '../../models/user.model';

const USER_KEY = 'schoolmgt_user';
const ROLE_KEY = 'schoolmgt_role';

@Injectable({ providedIn: 'root' })
export class AuthSignalService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user = signal<FirebaseUser | null>(null);
  userData = signal<User | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    // Restore cached user data
    const storedUser = sessionStorage.getItem(USER_KEY);
    const storedRole = sessionStorage.getItem(ROLE_KEY);
    if (storedUser && storedRole) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.uid && parsedUser?.email) {
          this.userData.set(parsedUser);
        }
      } catch {
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(ROLE_KEY);
      }
    }

    onAuthStateChanged(this.auth, async (fbUser) => {
      this.user.set(fbUser);
      if (fbUser) {
        await this.loadUserData(fbUser.uid);
      } else {
        this.clearSession();
      }
    });
  }

  async signup(
    email: string,
    password: string,
    displayName: string,
    role: User['role']
  ) {
    this.loading.set(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const newUser: User = {
        uid: cred.user.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      await setDoc(doc(this.firestore, 'users', newUser.uid), newUser);

      this.userData.set(newUser);
      this.cacheUser(newUser);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async login(email: string, password: string) {
    this.loading.set(true);
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);

      // Load profile and update lastLogin
      await this.loadUserData(cred.user.uid);
      await setDoc(
        doc(this.firestore, 'users', cred.user.uid),
        { lastLogin: new Date() },
        { merge: true }
      );

      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async logout() {
    this.loading.set(true);
    try {
      await signOut(this.auth);
      this.clearSession();
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteAccount() {
    this.loading.set(true);
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
        await deleteDoc(doc(this.firestore, 'users', currentUser.uid));
        this.clearSession();
        this.error.set(null);
      }
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadUserData(uid: string) {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const user: User = {
          uid,
          email: data['email'],
          displayName: data['displayName'],
          role: data['role'],
          createdAt: data['createdAt']?.toDate?.() ?? new Date(),
          lastLogin: data['lastLogin']?.toDate?.() ?? new Date(),
        };
        this.userData.set(user);
        this.cacheUser(user);
        // i love this
      } else {
        this.clearSession();
      }
    } catch {
      this.clearSession();
    }
  }

  clearError() {
    this.error.set(null);
  }

  private cacheUser(user: User) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    sessionStorage.setItem(ROLE_KEY, user.role);
  }

  private clearSession() {
    this.userData.set(null);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ROLE_KEY);
  }
}
