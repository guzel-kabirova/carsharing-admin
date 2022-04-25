import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {ICarDto, ICategory} from '../auto-card-page.interface';
import {IResponse} from '../../app.interface';
import {AutoCardPageStoreService} from './auto-card-page.store.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: AutoCardPageStoreService,
  ) {}

  setNewCar(car: ICarDto): Observable<any> {
    return this._http.post(`${API_URL}/db/car/`, car);
  }

  getCategories(): Observable<ICategory[]> {
    return this._http.get<IResponse<ICategory>>(`${API_URL}db/category`).pipe(
      map(response => response.data.map(({id, name}) => ({id, name}))),
      tap(categories => this._store.setCategories(categories)),
    );
  }
}
