import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public form?: FormGroup;

  private get emailField(): AbstractControl | null | undefined {
    return this.form?.get('email');
  }

  private get passwordField(): AbstractControl | null | undefined {
    return this.form?.get('password');
  }

  public get isEmail(): boolean {
    return this.emailField && this.emailField.touched && this.emailField.errors?.required;
  }

  public get isEmailCorrect(): boolean {
    return this.emailField && this.emailField.touched && this.emailField.errors?.email;
  }

  public get isPassword(): boolean {
    return this.passwordField && this.passwordField.touched && this.passwordField.errors?.required;
  }

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public submit() {
    if (this.form?.invalid) {
      return;
    }
    console.log(this.form?.value);
  }
}
