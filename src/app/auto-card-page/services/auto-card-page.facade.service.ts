import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {AutoCardPageApiService} from './auto-card-page.api.service';
import {AutoCardPageStoreService} from './auto-card-page.store.service';
import {AppStoreService} from '../../shared/services/app.store.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageFacadeService {
  public api = this._api;
  public autoCardStore = this._autoCardStore;
  public appStore = this._appStore;

  public resetAutoCardForms$ = new Subject<void>();

  constructor(
    private _api: AutoCardPageApiService,
    private _autoCardStore: AutoCardPageStoreService,
    private _appStore: AppStoreService,
  ) {}
}
