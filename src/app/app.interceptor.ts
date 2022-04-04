import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'X-Api-Factory-Application-Id': environment.appId,
      'Authorization': `Basic ${btoa(environment.basicToken)}`,
    });
    const cloned = req.clone({headers});

    return next.handle(cloned);
  }
}
