import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  http = inject(HttpClient);
  toaster = inject(ToastrService);
  router = inject(Router);
  formSubmitted: boolean = false;

  registerForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get username() {
    return this.registerForm.get('username');
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.http
        .post(
          'http://localhost:4000/auth/register',
          {
            ...this.registerForm.getRawValue(),
          },
          {
            withCredentials: true,
          }
        )
        .pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            this.toaster.error(errorResponse.error, 'This is an Error');
            return throwError(
              () => new Error('Something bad happened; please try again later.')
            );
          })
        )
        .subscribe({
          next: (response) => {
            this.toaster.success('You have registered successfully');
            this.router.navigateByUrl('/login');
          },
        });
      console.log('register api call');
    }
  }
}
