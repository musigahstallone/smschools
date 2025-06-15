export interface Class {
  id: string;
  className: string;
  teacherId: string;
  studentIds: string[];
  schedule: string;
  room: string;
  createdAt: Date;
}
