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
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, finalize, switchMap, take, tap} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {AuthService} from './auth/services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private isRedirected = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    if (req.url.includes('logout')) {
      headers = this.getHeaders(environment.appId, this.getBearerToken());
    } else {
      headers = this.getHeaders(environment.appId, this.getBasicToke());
    }

    const cloned = req.clone({headers});

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.includes('refresh')) {
          this.throwErrorWhenRefreshing(error);
        }

        if (error.status === 401) {
          if (!this.isRefreshing) {
            this.refreshToken();
          }

          return this.refreshTokenSubject.pipe(
            filter(result => result),
            take(1),
            switchMap(() => next.handle(cloned)),
          );
        } else {
          return throwError(error);
        }
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

  private throwErrorWhenRefreshing(error: HttpErrorResponse) {
    this.isRedirected = true;
    return throwError(error);
  }

  private refreshToken() {
    this.isRefreshing = true;
    this._authService.refresh()
      .pipe(
        finalize(() => this.resetToInitial()),
        tap(() => this.refreshTokenSubject.next(true)),
        catchError(error => {
          this.refreshTokenSubject.next(false);
          return throwError(error);
        }),
      ).subscribe();
  }

  private resetToInitial() {
    this.isRefreshing = false;
    this.refreshTokenSubject.next(false);

    if (this.isRedirected) {
      this._router.navigate(['']);
    }
  }
}
