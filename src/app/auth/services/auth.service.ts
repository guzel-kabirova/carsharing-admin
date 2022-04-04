import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {IAuth, IAuthResponse, IAuthResponseMapped} from '../auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$ = new Subject<string>();

  get token(): string | null {
    const expiresStr = localStorage.getItem('api-expires');
    if (expiresStr) {
      const expiresData = new Date(expiresStr);
      if (new Date() > expiresData) {
        this.logout();
        return null;
      }
      return localStorage.getItem('api-token');
    }
    return null;
  }

  constructor(private _http: HttpClient) {}

  public login(loginInfo: IAuth): Observable<IAuthResponseMapped> {
    return this._http.post<IAuthResponse>(`${API_URL}auth/login`, loginInfo)
      .pipe(
        map(response => ({
          token: response.access_token,
          refreshToken: response.refresh_token,
          expiresIn: response.expires_in,
        })),
        tap(response => this.setToken(response)),
        catchError(error => this.handleError(error)),
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: IAuthResponseMapped | null) {
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('api-token', response.token);
      localStorage.setItem('api-refresh-token', response.refreshToken);
      localStorage.setItem('api-expires', expiresDate.toString());
      return;
    }
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const status = error.status;
    if (status === 401) {
      this.error$.next('Такого пользователя не существует. Пожалуйста, проверьте введенные данные');
    }
    return throwError(error);
  }
}
