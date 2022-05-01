import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {AutoCardPageApiService} from './auto-card-page.api.service';
import {AutoCardPageStoreService} from './auto-card-page.store.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageFacadeService {
  public api = this._api;
  public store = this._store;

  public resetAutoCardForms$ = new Subject<void>();

  constructor(
    private _api: AutoCardPageApiService,
    private _store: AutoCardPageStoreService,
  ) {}
}
