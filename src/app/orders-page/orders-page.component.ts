import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {takeUntil, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';

import {DestroyService} from '../shared/services/destroy.service';
import {OrdersPageFacadeService} from './services/orders-page.facade.service';
import {ROWS_PER_PAGE} from './orders-page.const';
import {OrderStatus} from '../app.interface';
import {IFilterData} from './order-page.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class OrdersPageComponent implements OnInit {
  public ordersCount$ = this._facade.ordersStore.ordersCount$;
  public rowsPerPage = ROWS_PER_PAGE;

  public orders$ = this._facade.ordersStore.orders$;
  public isLoading = false;

  public status = OrderStatus;
  public filterData: IFilterData = {
    interval: [],
    category: [],
    city: [],
    status: [],
  };

  private _page = 0;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: OrdersPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.setFilterData();
  }

  private loadOrders() {
    this.isLoading = true;
    this._facade.api.getOrders(this._page).pipe(
      tap(() => this.isLoading = false),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  setFilterData() {
    combineLatest([this._facade.appStore.categories$, this._facade.appStore.cities$, this._facade.appStore.orderStatuses$]).pipe(
      tap(([categories, cities, statuses]) => {
        this.filterData.category = categories;
        this.filterData.city = cities;
        this.filterData.status = statuses;
      }),
      takeUntil(this._destroy$),
    )
      .subscribe();
  }

  public changePage(page: number) {
    this._page = page - 1;
    this.loadOrders();
  }

  public applyOrder(id: string) {
    console.log(id);
  }

  public cancelOrder(id: string) {
    console.log(id);
  }

  public editOrder(id: string) {
    console.log(id);
  }
}
