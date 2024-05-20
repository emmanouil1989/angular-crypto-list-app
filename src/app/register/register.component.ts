import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
      console.log('register api call');
    }
  }
}
