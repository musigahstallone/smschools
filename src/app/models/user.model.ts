export interface User {
  uid: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  email: string;
  displayName: string;
  createdAt: Date;
  lastLogin: Date;
}
