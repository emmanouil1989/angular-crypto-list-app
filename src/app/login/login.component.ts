import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserInterface } from './user.interface';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  http = inject(HttpClient);
  toaster = inject(ToastrService);
  router = inject(Router);

  formSubmitted: boolean = false;
  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      this.http
        .post<{ user: UserInterface }>(
          'http://localhost:4000/auth/login',
          {
            ...this.loginForm.getRawValue(),
          },
          {
            withCredentials: true,
          }
        )
        .pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            this.toaster.error(errorResponse.error, 'This is an Error');
            return throwError(
              () => new Error('Something bad happened; please try again later.')
            );
          })
        )
        .subscribe({
          next: (response) => {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigateByUrl('/');
          },
        });
    }
  }
}
