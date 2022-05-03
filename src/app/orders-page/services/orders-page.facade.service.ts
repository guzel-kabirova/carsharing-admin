import {Injectable} from '@angular/core';

import {OrdersPageApiService} from './orders-page.api.service';
import {OrdersPageStoreService} from './orders-page.store.service';
import {AppStoreService} from '../../shared/services/app.store.service';

@Injectable({providedIn: 'root'})
export class OrdersPageFacadeService {
  public api = this._api;
  public ordersStore = this._ordersStore;
  public appStore = this._appStore;

  constructor(
    private _api: OrdersPageApiService,
    private _ordersStore: OrdersPageStoreService,
    private _appStore: AppStoreService,
  ) {}
}
