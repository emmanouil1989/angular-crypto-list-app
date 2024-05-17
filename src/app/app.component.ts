import { Component, Inject, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './login/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  authService = inject(AuthService);
  toaster = inject(ToastrService);
  router = inject(Router);
  http = inject(HttpClient);
  title = 'angular-cypto';

  logout() {
    this.http
      .post('http://localhost:4000/auth/logout', undefined, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        },
      });
  }
}
