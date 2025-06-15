import {
  Component,
  afterNextRender,
  signal,
  effect,
  input,
  output,
  computed,
  inject,
} from '@angular/core';
import { AuthSignalService } from '../../services/auth/auth-signal.service';
import { FormsModule } from '@angular/forms';
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

  async login() {
    await this.auth.login(this.email(), this.password());
  }

  async signup() {
    await this.auth.signup(
      this.email(),
      this.password(),
      this.displayName(),
      'student' // default role
    );
  }

  toggleMode() {
    this.signupMode.set(!this.signupMode());
    this.auth.clearError();
  }
}
