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
import { Grade } from '../../models/grade.model';

@Injectable({ providedIn: 'root' })
export class GradeSignalService {
  private firestore = inject(Firestore);
  private gradesCollection = collection(this.firestore, 'grades');

  grades = signal<Grade[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.loadGrades();
  }

  loadGrades() {
    this.loading.set(true);
    collectionData(this.gradesCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.grades.set(data as Grade[]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  async addGrade(grade: Omit<Grade, 'id'>) {
    this.loading.set(true);
    try {
      await addDoc(this.gradesCollection, grade as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async updateGrade(id: string, grade: Partial<Grade>) {
    this.loading.set(true);
    try {
      const gradeDoc = doc(this.firestore, `grades/${id}`);
      await updateDoc(gradeDoc, grade as DocumentData);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteGrade(id: string) {
    this.loading.set(true);
    try {
      const gradeDoc = doc(this.firestore, `grades/${id}`);
      await deleteDoc(gradeDoc);
      this.error.set(null);
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
