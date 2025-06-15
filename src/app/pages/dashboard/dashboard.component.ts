import { Component, inject, computed } from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { StudentDashboardComponent } from '../../components/dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from '../../components/dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from '../../components/dashboard/admin-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StudentDashboardComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private auth = inject(AuthSignalService);
  user = computed(() => this.auth.userData());
}
