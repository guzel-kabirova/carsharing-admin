import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {ICarDto} from '../auto-card-page.interface';
import {AutoCardPageStoreService} from './auto-card-page.store.service';
import {ICar} from '../../orders-page/order-page.interface';

@Injectable({providedIn: 'root'})
export class AutoCardPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: AutoCardPageStoreService,
  ) {}

  setNewCar(car: ICarDto): Observable<void> {
    return this._http.post<void>(`${API_URL}/db/car/`, car);
  }

  editCar(car: Partial<ICar>): Observable<void> {
    return this._http.put<void>(`${API_URL}/db/car/`, car);
  }

  deleteCar(id: string): Observable<void> {
    return this._http.delete<void>(`${API_URL}/db/car/${id}`);
  }

  getCar(id: string): Observable<ICar> {
    return this._http.get<{ data: ICar }>(`${API_URL}/db/car/${id}`).pipe(
      map(response => response.data),
      tap(car => this._store.setCarToEditForm(car)),
    );
  }
}
