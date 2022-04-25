import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {AuthService} from './auth/services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    if (req.url.includes('login')) {
      headers = this.getHeaders(environment.appId, this.getBasicToke());
    } else {
      headers = this.getHeaders(environment.appId, this.getBearerToken());
    }

    const cloned = req.clone({headers});

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('login')) {
          return this._authService.refresh().pipe(
            take(1),
            switchMap(() => next.handle(cloned)),
          );
        }
        return throwError(error);
      }));
  }

  private getHeaders(appId: string, token: string): HttpHeaders {
    return new HttpHeaders({
      'X-Api-Factory-Application-Id': appId,
      'Authorization': `${token}`,
    });
  }

  private getBearerToken(): string {
    return `Bearer ${localStorage.getItem('api-token')}`;
  }

  private getBasicToke() {
    return `Basic ${btoa(environment.basicToken)}`;
  }
}
