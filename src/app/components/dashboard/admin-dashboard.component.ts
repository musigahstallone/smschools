import { Component, inject, computed } from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { StudentSignalService } from '../../services/student/student-signal.service';
import { TeacherSignalService } from '../../services/teacher/teacher-signal.service';
import { ClassSignalService } from '../../services/class/class-signal.service';
import { GradeSignalService } from '../../services/grade/grade-signal.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  private auth = inject(AuthSignalService);
  private students = inject(StudentSignalService);
  private teachers = inject(TeacherSignalService);
  private classes = inject(ClassSignalService);
  private grades = inject(GradeSignalService);

  user = computed(() => this.auth.userData());
  allStudents = computed(() => this.students.students());
  allTeachers = computed(() => this.teachers.teachers());
  allClasses = computed(() => this.classes.classes());
  allGrades = computed(() => this.grades.grades());
}
/*{
  "hosting": {
    "site": "osmschool",

    "public": "public",
    ...
  }
}*/
