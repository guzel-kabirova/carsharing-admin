import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';

import {ICar} from '../../orders-page/order-page.interface';
import {AutoCardPageApiService} from './auto-card-page.api.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageResolver implements Resolve<Observable<ICar>> {
  constructor(private _api: AutoCardPageApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICar> {
    return this._api.getCar(route.params.id);
  }
}
