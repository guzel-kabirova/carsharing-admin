import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {IResponse} from '../../app.interface';
import {ICity, IStatus} from '../../orders-page/order-page.interface';
import {API_URL} from '../../app.const';
import {AppStoreService} from './app.store.service';
import {ICategory} from '../../auto-card-page/auto-card-page.interface';

@Injectable({providedIn: 'root'})
export class AppApiService {
  constructor(
    private _http: HttpClient,
    private _store: AppStoreService,
  ) {}

  getCategories(): Observable<ICategory[]> {
    return this._http.get<IResponse<ICategory>>(`${API_URL}db/category`).pipe(
      map(response => response.data.map(({id, name}) => ({id, name}))),
      tap(categories => this._store.setCategories(categories)),
    );
  }

  getCities(): Observable<IResponse<ICity>> {
    return this._http.get<IResponse<ICity>>(`${API_URL}/db/city`).pipe(
      tap(response => this._store.setCities(response.data)),
    );
  }

  getOrderStatus(): Observable<IResponse<IStatus>> {
    return this._http.get<IResponse<IStatus>>(`${API_URL}db/orderStatus`).pipe(
      tap(response => this._store.setOrderStatuses(response.data)),
    );
  }
}
