import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {IResponse} from '../../app.interface';
import {IOrder, OrderModel} from '../order-page.interface';
import {OrdersPageStoreService} from './orders-page.store.service';
import {ROWS_PER_PAGE} from '../orders-page.const';

@Injectable({providedIn: 'root'})
export class OrdersPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: OrdersPageStoreService,
  ) {}

  getOrders(): Observable<IResponse<IOrder>> {
    return this._http.get<IResponse<IOrder>>(`${API_URL}/db/order?limit=${ROWS_PER_PAGE}`).pipe(
      tap(response => {
        this._store.setOrders(response.data.filter(order => !!order.carId).map(order => new OrderModel(order)));
        this._store.setOrdersCount(response.count);
      }),
    );
  }
}
