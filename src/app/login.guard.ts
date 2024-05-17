import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformServer } from '@angular/common';

export const loginGuard: CanActivateFn = async (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return false;
  }
  const router = inject(Router);
  const authService = inject(AuthService);
  const userRecord = await authService.getAuthUser();
  if (userRecord !== undefined) {
    router.navigateByUrl('/');
    return false;
  }
  localStorage.removeItem('user');

  return true;
};
