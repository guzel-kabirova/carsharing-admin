import {Injectable} from '@angular/core';

import {OrdersPageApiService} from './orders-page.api.service';
import {OrdersPageStoreService} from './orders-page.store.service';

@Injectable({providedIn: 'root'})
export class OrdersPageFacadeService {
  public api = this._api;
  public store = this._store;

  constructor(
    private _api: OrdersPageApiService,
    private _store: OrdersPageStoreService,
  ) {}
}
