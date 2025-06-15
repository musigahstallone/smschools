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
import { Teacher } from '../../models/teacher.model';

@Injectable({ providedIn: 'root' })
export class TeacherSignalService {
  private firestore = inject(Firestore);
  private teachersCollection = collection(this.firestore, 'teachers');

  teachers = signal<Teacher[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading.set(true);
    collectionData(this.teachersCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.teachers.set(data as Teacher[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  async addTeacher(teacher: Omit<Teacher, 'id'>) {
    this.loading.set(true);
    try {
      await addDoc(this.teachersCollection, teacher as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async updateTeacher(id: string, teacher: Partial<Teacher>) {
    this.loading.set(true);
    try {
      const teacherDoc = doc(this.firestore, `teachers/${id}`);
      await updateDoc(teacherDoc, teacher as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteTeacher(id: string) {
    this.loading.set(true);
    try {
      const teacherDoc = doc(this.firestore, `teachers/${id}`);
      await deleteDoc(teacherDoc);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
