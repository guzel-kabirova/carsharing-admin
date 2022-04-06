import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    if (req.url.includes('auth/logout')) {
      headers = this.getHeaders(environment.appId, this.getBearerToken());
    } else {
      headers = this.getHeaders(environment.appId, this.getBasicToke());
    }

    const cloned = req.clone({headers});
    return next.handle(cloned);
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
