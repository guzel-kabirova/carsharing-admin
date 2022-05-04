import {Injectable} from '@angular/core';

import {AutoListPageApiService} from './auto-list-page.api.service';
import {AutoListPageStoreService} from './auto-list-page.store.service';
import {AppStoreService} from '../../shared/services/app.store.service';

@Injectable({providedIn: 'root'})
export class AutoListPageFacadeService {
  public carsApi = this._carsApi;
  public carsStore = this._carsStore;
  public appStore = this._appStore;

  constructor(
    private _carsApi: AutoListPageApiService,
    private _carsStore: AutoListPageStoreService,
    private _appStore: AppStoreService,
  ) {}
}
