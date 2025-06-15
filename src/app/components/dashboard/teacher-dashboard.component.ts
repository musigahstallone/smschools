import { Component, inject, computed } from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { ClassSignalService } from '../../services/class/class-signal.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent {
  private auth = inject(AuthSignalService);
  private classes = inject(ClassSignalService);

  user = computed(() => this.auth.userData());
  teacherClasses = computed(() =>
    this.classes.classes().filter((c) => c.teacherId === this.user()?.uid)
  );
}
