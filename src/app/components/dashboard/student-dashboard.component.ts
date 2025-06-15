import { Component, inject, computed } from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { GradeSignalService } from '../../services/grade/grade-signal.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  private auth = inject(AuthSignalService);
  private grades = inject(GradeSignalService);

  user = computed(() => this.auth.userData());
  studentGrades = computed(() =>
    this.grades.grades().filter((g) => g.studentId === this.user()?.uid)
  );
}
