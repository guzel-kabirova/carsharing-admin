import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {takeUntil, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';

import {DestroyService} from '../shared/services/destroy.service';
import {OrdersPageFacadeService} from './services/orders-page.facade.service';
import {INTERVALS, ROWS_PER_PAGE} from './orders-page.const';
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
    this.filterData.interval = INTERVALS;
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

  public confirmOrder(id: string) {
    this._facade.api.confirmOrder(id).pipe(
      tap(() => this._facade.ordersStore.changeOrderStatus(id, OrderStatus.Confirmed)),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  public cancelOrder(id: string) {
    this._facade.api.cancelOrder(id).pipe(
      tap(() => this._facade.ordersStore.changeOrderStatus(id, OrderStatus.Canceled)),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  public editOrder(id: string) {
    console.log('edit order with id:', id);
  }
}
