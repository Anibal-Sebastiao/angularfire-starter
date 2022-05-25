import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { typesEnums } from 'src/app/shared/enums/type.enum';


@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})

export class EmailLoginComponent implements OnInit {

  form: FormGroup;
  type: typesEnums | undefined;
  typesEnums = typesEnums;
  loading = false;
  serverMessage: any;

  constructor(private fb: FormBuilder, private  afAuth: AngularFireAuth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []]
    });
  }

  ngOnInit(): void {
    this.type = typesEnums.logIn;
  }

  changeType(val: any) {
    this.type = val;
  }

  formType(val: string) {
    return this.type === val;
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get passwordConfirm() { return this.form.get('passwordConfirm'); }
  get passwordDoesMatch() { return (this.type !== 'signup') ? true : this.password?.value === this.passwordConfirm?.value }

  async  onSubmit() {
    const {email, password} = this.form.value;

    try {
      if(this.formType(this.typesEnums.logIn)) await this.afAuth.signInWithEmailAndPassword(email, password);

      if(this.formType(this.typesEnums.signUp)) await this.afAuth.createUserWithEmailAndPassword(email, password);

      if(this.formType(this.typesEnums.reset)) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }

    } catch (error) {
      this.serverMessage = error;
    }

    this.loading = true;

  }


}
