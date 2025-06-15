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
import { Student } from '../../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentSignalService {
  private firestore = inject(Firestore);
  private studentsCollection = collection(this.firestore, 'students');

  students = signal<Student[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading.set(true);
    collectionData(this.studentsCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.students.set(data as Student[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  async addStudent(student: Omit<Student, 'id'>) {
    this.loading.set(true);
    try {
      await addDoc(this.studentsCollection, student as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async updateStudent(id: string, student: Partial<Student>) {
    this.loading.set(true);
    try {
      const studentDoc = doc(this.firestore, `students/${id}`);
      await updateDoc(studentDoc, student as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteStudent(id: string) {
    this.loading.set(true);
    try {
      const studentDoc = doc(this.firestore, `students/${id}`);
      await deleteDoc(studentDoc);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
