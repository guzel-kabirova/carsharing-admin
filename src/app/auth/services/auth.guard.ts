import {CanLoad, Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canLoad(): boolean {
    const isAuthenticated = this._authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }

}
