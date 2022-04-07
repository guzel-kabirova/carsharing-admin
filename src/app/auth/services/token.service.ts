import {Injectable} from '@angular/core';

import {IAuthResponseMapped} from '../auth.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public get token(): string | null {
    return localStorage.getItem('api-token');
  }

  private get tokenExpiresDate(): Date | null {
    const expiresStr = localStorage.getItem('api-expires');
    if (expiresStr) {
      return new Date(expiresStr);
    }
    return null;
  }

  public isTokenExpired(): boolean {
    return !!this.tokenExpiresDate && new Date() > this.tokenExpiresDate;
  }

  public hasToken(): boolean {
    return !!this.token;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('api-refresh-token') ?? '';
  }

  public setToken(response: IAuthResponseMapped | null) {
    if (response) {
      const {expiresIn, token, refreshToken} = response;
      const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
      localStorage.setItem('api-token', token);
      localStorage.setItem('api-refresh-token', refreshToken);
      localStorage.setItem('api-expires', expiresDate.toString());
      return;
    }
    this.clearToken();
  }

  private clearToken() {
    localStorage.clear();
  }
}
