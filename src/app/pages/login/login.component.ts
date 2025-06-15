import { Component, signal, computed, inject, ViewChild } from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgIf, NgFor],
})
export class LoginComponent {
  private auth = inject(AuthSignalService);

  email = signal('');
  password = signal('');
  displayName = signal('');
  loading = computed(() => this.auth.loading());
  error = computed(() => this.auth.error());
  signupMode = signal(false);

  passwordVisible = signal(false);
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  displayNameError = signal<string | null>(null);
  
  @ViewChild('emailInput') emailInput!: NgModel;
  @ViewChild('passwordInput') passwordInput!: NgModel;
  @ViewChild('displayNameInput') displayNameInput!: NgModel;
  
  get isFormInvalid() {
    const signup = this.signupMode();
    return (
      this.loading() ||
      this.emailInput?.invalid ||
      this.passwordInput?.invalid ||
      (signup && this.displayNameInput?.invalid)
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  async login() {
    this.clearValidationErrors();
    if (!this.email()) {
      this.emailError.set('Email is required.');
      return;
    }
    if (!this.password()) {
      this.passwordError.set('Password is required.');
      return;
    }
    await this.auth.login(this.email(), this.password());
  }

  async signup() {
    this.clearValidationErrors();
    if (!this.email()) {
      this.emailError.set('Email is required.');
      return;
    }
    if (!this.password()) {
      this.passwordError.set('Password is required.');
      return;
    }
    if (!this.displayName()) {
      this.displayNameError.set('Full Name is required.');
      return;
    }
    await this.auth.signup(
      this.email(),
      this.password(),
      this.displayName(),
      'student'
    );
  }

  toggleMode() {
    this.signupMode.set(!this.signupMode());
    this.clearValidationErrors();
    this.auth.clearError();
  }

  private clearValidationErrors() {
    this.emailError.set(null);
    this.passwordError.set(null);
    this.displayNameError.set(null);
  }
}
