import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {OrderModel} from '../order-page.interface';
import {OrderStatus} from '../../app.interface';

@Injectable({providedIn: 'root'})
export class OrdersPageStoreService {
  private _orders = new BehaviorSubject<OrderModel[]>([]);
  public orders$ = this._orders.asObservable();

  private _ordersCount = new BehaviorSubject<number>(0);
  public ordersCount$ = this._ordersCount.asObservable();

  constructor() {}

  public setOrders(orders: OrderModel[]) {
    this._orders.next(orders);
  }

  public changeOrderStatus(id: string, status: OrderStatus) {
    const changedOrders = this.getOrders().map(order => {
      if (order.id === id) {
        return {...order, orderStatus: status};
      }
      return order;
    });

    this.setOrders(changedOrders);
  }

  private getOrders(): OrderModel[] {
    return this._orders.getValue();
  }

  public setOrdersCount(count: number) {
    this._ordersCount.next(count);
  }
}
