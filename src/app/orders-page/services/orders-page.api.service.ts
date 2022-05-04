import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {IResponse, OrderStatus} from '../../app.interface';
import {IOrder, OrderModel} from '../order-page.interface';
import {OrdersPageStoreService} from './orders-page.store.service';
import {ROWS_PER_PAGE} from '../orders-page.const';
import {AppStoreService} from '../../shared/services/app.store.service';

@Injectable({providedIn: 'root'})
export class OrdersPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: OrdersPageStoreService,
    private _appStore: AppStoreService,
  ) {}

  getOrders(pageIndex: number, filters: string): Observable<IResponse<IOrder>> {
    return this._http.get<IResponse<IOrder>>(`${API_URL}db/order?sort[updatedAt]=-1&page=${pageIndex}&limit=${ROWS_PER_PAGE}${filters}`).pipe(
      tap(response => {
        this._store.setOrders(response.data.filter(order => !!order.carId).map(order => new OrderModel(order)));
        this._store.setOrdersCount(response.count);
      }),
    );
  }

  confirmOrder(id: string): Observable<IResponse<IOrder>> {
    const orderStatusId = this._appStore.getOrderStatuses().filter(status => status.name.includes(OrderStatus.Confirmed))[0];
    return this._http.put<IResponse<IOrder>>(`${API_URL}db/order/${id}`, {orderStatusId});
  }

  cancelOrder(id: string): Observable<IResponse<IOrder>> {
    const orderStatusId = this._appStore.getOrderStatuses().filter(status => status.name.includes(OrderStatus.Canceled))[0];
    return this._http.put<IResponse<IOrder>>(`${API_URL}db/order/${id}`, {orderStatusId});
  }
}
