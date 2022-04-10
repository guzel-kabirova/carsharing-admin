import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {IAuth, IAuthResponse, IAuthResponseMapped} from '../auth.interface';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$ = new Subject<string>();

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
  ) {}

  public login(loginInfo: IAuth): Observable<IAuthResponseMapped> {
    return this._http.post<IAuthResponse>(`${API_URL}auth/login`, loginInfo)
      .pipe(
        map(response => this.mapResponse(response)),
        tap(response => this._tokenService.setToken(response)),
        catchError(error => this.handleError(error)),
      );
  }

  private mapResponse(response: IAuthResponse): IAuthResponseMapped {
    const {access_token, refresh_token, expires_in} = response;
    return {
      token: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  }

  public logout(): Observable<void> {
    return this._http.post<void>(`${API_URL}auth/logout`, '');
  }

  public refresh(): Observable<IAuthResponseMapped> {
    return this._http.post<IAuthResponse>(`${API_URL}auth/refresh`, {'refresh_token': this._tokenService.getRefreshToken()})
      .pipe(
        map(response => this.mapResponse(response)),
        tap(response => this._tokenService.setToken(response)),
        catchError(error => throwError(error)),
      );
  }

  public isAuthenticated(): boolean {
    return this._tokenService.hasToken() && !this._tokenService.isTokenExpired();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    if (status === 401) {
      this.error$.next('Такого пользователя не существует. Пожалуйста, проверьте введенные данные');
    }
    return throwError(error);
  }
}
