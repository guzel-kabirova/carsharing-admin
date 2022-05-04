import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import {AutoListPageFacadeService} from './services/auto-list-page.facade.service';
import {ROWS_PER_PAGE} from '../orders-page/orders-page.const';
import {CARS_TABLE_HEADERS} from './auto-list-page.const';
import {DestroyService} from '../shared/services/destroy.service';
import {IFilterDataAuto} from './auto-list-page.interface';


@Component({
  selector: 'app-auto-list-page',
  templateUrl: './auto-list-page.component.html',
  styleUrls: ['./auto-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AutoListPageComponent implements OnInit {
  public carsCount$ = this._facade.carsStore.carsCount$;
  public rowsPerPage = ROWS_PER_PAGE;

  public cars$ = this._facade.carsStore.cars$;
  public isLoading = false;

  private _page = 0;
  private _filters = '';

  public headers = CARS_TABLE_HEADERS;

  public filterData: IFilterDataAuto = {
    category: [],
  };

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: AutoListPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.loadCars();
    this.setFilterData();
  }

  private loadCars() {
    this.isLoading = true;
    this._facade.carsApi.getCars(this._page, this._filters).pipe(
      tap(() => this.isLoading = false),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  public changePage(page: number) {
    this._page = page - 1;
    this.loadCars();
  }

  private setFilterData() {
    combineLatest([this._facade.appStore.categories$]).pipe(
      tap(([categories]) => {
        this.filterData.category = categories;
      }),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  handelFilter(filters: Partial<IFilterDataAuto> = {}) {
    let resultStr = '';
    Object.keys(filters).map(key => {
      switch (key) {
        case 'category':
          resultStr += `&categoryId=${filters.category}`;
          break;
        default:
          resultStr += '';
      }
    });
    this._filters = resultStr;
    this.loadCars();
  }
}
