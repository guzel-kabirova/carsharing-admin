import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AppApiService} from './shared/services/app.api.service';
import {DestroyService} from './shared/services/destroy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService],
})
export class AppComponent implements OnInit {
  title = 'carsharing-admin';

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _api: AppApiService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadStatuses();
    this.loadCities();
  }

  private loadStatuses() {
    this._api.getOrderStatus().pipe(takeUntil(this._destroy$)).subscribe();
  }

  private loadCategories() {
    this._api.getCategories().pipe(takeUntil(this._destroy$)).subscribe();
  }

  private loadCities() {
    this._api.getCities().pipe(takeUntil(this._destroy$)).subscribe();
  }
}
