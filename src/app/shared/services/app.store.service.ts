import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ICity, IStatus} from '../../orders-page/order-page.interface';
import {ICategory} from '../../auto-card-page/auto-card-page.interface';

@Injectable({providedIn: 'root'})
export class AppStoreService {
  private _categories = new BehaviorSubject<ICategory[]>([]);
  public categories$ = this._categories.asObservable();

  private _orderStatuses = new BehaviorSubject<IStatus[]>([]);
  public orderStatuses$ = this._orderStatuses.asObservable();

  private _cities = new BehaviorSubject<ICity[]>([]);
  public cities$ = this._cities.asObservable();

  constructor() {}

  public setCategories(categories: ICategory[]) {
    this._categories.next(categories);
  }

  public getCategories(): ICategory[] {
    return this._categories.getValue();
  }

  public setOrderStatuses(statuses: IStatus[]) {
    this._orderStatuses.next(statuses);
  }

  public getOrderStatuses(): IStatus[] {
    return this._orderStatuses.getValue();
  }

  public setCities(cities: ICity[]) {
    this._cities.next(cities);
  }
}
