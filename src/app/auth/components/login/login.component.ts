import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { Store } from '@ngrx/store';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authLoginActions } from '../../store/actions';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private store: Store) {}
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);
  backendErrors$ = this.store.select(selectValidationErrors);

  onSubmit(): void {
    console.log(this.form.value);
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authLoginActions.login({ request }));
  }
}
