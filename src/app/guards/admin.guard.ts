import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSignalService } from '../services/auth/auth-signal.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthSignalService);
  return auth.userData()?.role === 'admin';
};
