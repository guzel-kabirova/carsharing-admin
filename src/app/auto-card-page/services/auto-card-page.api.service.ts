import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {API_URL} from '../../app.const';
import {ICarDto} from '../auto-card-page.interface';
import {AutoCardPageStoreService} from './auto-card-page.store.service';
import {ICar} from '../../orders-page/order-page.interface';
import {AlertService} from '../../shared/services/alert-message.service';

@Injectable({providedIn: 'root'})
export class AutoCardPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: AutoCardPageStoreService,
    private _alertService: AlertService,
  ) {}

  setNewCar(car: ICarDto): Observable<void> {
    return this._http.post<void>(`${API_URL}/db/car/`, car).pipe(
      tap(() => this._alertService.success('Успех! Машина сохранена')),
      catchError(err => {
        this._alertService.danger('Упс! Что-то пошло не так. Попробуйте создать машину повторно');
        return throwError(err);
      }),
    );
  }

  editCar(car: Partial<ICar>): Observable<void> {
    return this._http.put<void>(`${API_URL}/db/car/`, car).pipe(
      tap(() => this._alertService.success('Класс! Машина успешно отредактирована')),
      catchError(err => {
        this._alertService.danger('Упс! Что-то пошло не так. Попробуйте отредактировать машину повторно');
        return throwError(err);
      }),
    );
  }

  deleteCar(id: string): Observable<void> {
    return this._http.delete<void>(`${API_URL}/db/car/${id}`).pipe(
      tap(() => this._alertService.success('Машина удалена:(')),
      catchError(err => {
        this._alertService.danger('Упс! Что-то пошло не так. Попробуйте удалить машину снова');
        return throwError(err);
      }),
    );
  }

  getCar(id: string): Observable<ICar> {
    return this._http.get<{ data: ICar }>(`${API_URL}/db/car/${id}`).pipe(
      map(response => response.data),
      tap(car => this._store.setCarToEditForm(car)),
    );
  }
}
