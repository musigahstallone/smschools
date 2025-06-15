import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Class } from '../../models/class.model';

@Injectable({ providedIn: 'root' })
export class ClassSignalService {
  private firestore = inject(Firestore);
  private classesCollection = collection(this.firestore, 'classes');

  classes = signal<Class[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadClasses();
  }

  loadClasses() {
    this.loading.set(true);
    collectionData(this.classesCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.classes.set(data as Class[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  async addClass(classData: Omit<Class, 'id'>) {
    this.loading.set(true);
    try {
      await addDoc(this.classesCollection, classData as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async updateClass(id: string, classData: Partial<Class>) {
    this.loading.set(true);
    try {
      const classDoc = doc(this.firestore, `classes/${id}`);
      await updateDoc(classDoc, classData as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteClass(id: string) {
    this.loading.set(true);
    try {
      const classDoc = doc(this.firestore, `classes/${id}`);
      await deleteDoc(classDoc);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
