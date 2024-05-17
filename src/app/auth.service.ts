import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { UserInterface } from './login/user.interface';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  async getAuthUser() {
    try {
      const response = await fetch(
        'http://localhost:4000/auth/users/loggedInUser',
        {
          credentials: 'include',
        }
      );
      const userRecord = (await response.json()) as { user: UserInterface };
      return userRecord.user;
    } catch (error) {
      localStorage.removeItem('user');

      this.router.navigateByUrl('/login');
      return undefined;
    }
  }

  getLocalStorageUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      const parsedUser = user !== null ? JSON.parse(user) : null;
      return parsedUser;
    }
    return undefined;
  }

  constructor() {}
}
