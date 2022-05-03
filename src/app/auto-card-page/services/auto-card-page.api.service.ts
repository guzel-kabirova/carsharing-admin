import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../app.const';
import {ICarDto} from '../auto-card-page.interface';
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
}
