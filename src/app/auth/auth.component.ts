import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

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

  public get isUsername(): boolean {
    return this.emailField && this.emailField.touched && this.emailField.errors?.required;
  }

  public get isPassword(): boolean {
    return this.passwordField && this.passwordField.touched && this.passwordField.errors?.required;
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.checkAuthentication();
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private checkAuthentication() {
    if (this._authService.isAuthenticated()) {
      this.navigateToAccount();
    }
  }

  public submit() {
    if (this.form?.invalid) {
      return;
    }
    this._authService.login(this.form?.value)
      .pipe(tap(() => this.navigateToAccount()))
      .subscribe();
  }

  private navigateToAccount() {
    this._router.navigate(['/admin', 'card']);
  }
}
