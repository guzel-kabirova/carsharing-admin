import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ICar} from '../../orders-page/order-page.interface';

@Injectable({providedIn: 'root'})
export class AutoListPageStoreService {
  private _cars = new BehaviorSubject<ICar[]>([]);
  public cars$ = this._cars.asObservable();

  private _carsCount = new BehaviorSubject<number>(0);
  public carsCount$ = this._carsCount.asObservable();

  constructor() {}

  public setCars(cars: ICar[]) {
    this._cars.next(cars);
  }

  public setCarsCount(count: number) {
    this._carsCount.next(count);
  }
}
