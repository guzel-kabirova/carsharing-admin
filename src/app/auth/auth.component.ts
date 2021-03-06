import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from './services/auth.service';
import {LOGIN_DETAILS_URL} from '../app.const';
import {DestroyService} from '../shared/services/destroy.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AuthComponent implements OnInit {
  public form = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public error$ = this._authService.error$;
  public loginDetailsUrl = LOGIN_DETAILS_URL;

  private get usernameField(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  private get passwordField(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  public get isUsername(): boolean {
    return this.usernameField.touched && this.usernameField.errors?.required;
  }

  public get isPassword(): boolean {
    return this.passwordField.touched && this.passwordField.errors?.required;
  }

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  private checkAuthentication() {
    if (this._authService.isAuthenticated()) {
      this.navigateToAccount();
    }
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }
    this.form.markAsPending();
    this._authService.login(this.form.value)
      .pipe(
        tap(() => this.navigateToAccount()),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  private navigateToAccount() {
    this._router.navigate(['/admin', 'card']);
  }
}
