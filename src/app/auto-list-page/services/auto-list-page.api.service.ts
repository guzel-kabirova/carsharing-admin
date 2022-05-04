import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {IResponse} from '../../app.interface';
import {ICar} from '../../orders-page/order-page.interface';
import {API_URL} from '../../app.const';
import {ROWS_PER_PAGE} from '../../orders-page/orders-page.const';
import {AutoListPageStoreService} from './auto-list-page.store.service';


@Injectable({providedIn: 'root'})
export class AutoListPageApiService {
  constructor(
    private _http: HttpClient,
    private _store: AutoListPageStoreService,
  ) {}

  getCars(pageIndex: number, filters: string): Observable<IResponse<ICar>> {
    return this._http.get<IResponse<ICar>>(`${API_URL}db/car?sort[updatedAt]=-1&page=${pageIndex}&limit=${ROWS_PER_PAGE}${filters}`).pipe(
      tap(response => {
        this._store.setCars(response.data);
        this._store.setCarsCount(response.count);
      }),
    );
  }
}
