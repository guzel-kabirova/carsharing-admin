import {Injectable} from '@angular/core';

import {AutoCardPageApiService} from './auto-card-page.api.service';
import {AutoCardPageStoreService} from './auto-card-page.store.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageFacadeService {
  public api = this._api;
  public store = this._store;

  constructor(
    private _api: AutoCardPageApiService,
    private _store: AutoCardPageStoreService,
  ) {}
}
