import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  ValidatorFn
} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;
  serverMessage: string = '';

  constructor(
                private fb: FormBuilder,
                private  afAuth: AngularFireAuth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
      /* ,passwordConfirm: ['', []] */
    });
  }

  ngOnInit(): void {
    this.passwordConfirm?.setValidators(this.retypePass(this.form.controls['password']));
  }

  retypePass(field: AbstractControl): ValidatorFn {
    console.log(field);

    return (control: AbstractControl) => (control.value == field.value) ? {control: true} : {control: false}
  }

  onSubmit() {
    console.log(this.passwordConfirm?.valid);

  }


  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

}
