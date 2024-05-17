import { Routes } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: CryptoListComponent,
    title: 'Crypto list',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
    canActivate: [loginGuard],
  },
];
