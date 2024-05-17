import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const authService = inject(AuthService);
  if (isPlatformServer(platformId)) {
    return false;
  }
  const authUser = await authService.getAuthUser();
  if (authUser) {
    return true;
  }
  localStorage.removeItem('user');

  router.navigateByUrl('/login');
  return false;
};
