import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { teacherGuard } from './guards/teacher.guard';
import { LoginComponent } from './pages/login/login.component';
import { ClassManagementComponent } from './pages/class-management/class-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { StudentManagementComponent } from './pages/student-management/student-management.component';
import { TeacherManagementComponent } from './pages/teacher-management/teacher-management.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students',
    component: StudentManagementComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'teachers',
    component: TeacherManagementComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'classes',
    component: ClassManagementComponent,
    canActivate: [authGuard, teacherGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
