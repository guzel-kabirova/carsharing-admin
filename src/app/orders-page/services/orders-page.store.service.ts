import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OrderModel} from '../order-page.interface';

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

  public getOrders(): OrderModel[] {
    return this._orders.getValue();
  }

  public setOrdersCount(count: number) {
    this._ordersCount.next(count);
  }

  public getOrdersCount(): number {
    return this._ordersCount.getValue();
  }
}
