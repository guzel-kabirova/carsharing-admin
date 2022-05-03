import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {DestroyService} from '../shared/services/destroy.service';
import {OrdersPageFacadeService} from './services/orders-page.facade.service';
import {ROWS_PER_PAGE} from './orders-page.const';
import {OrderStatus} from '../app.interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class OrdersPageComponent implements OnInit {
  public ordersCount$ = this._facade.store.ordersCount$;
  public rowsPerPage = ROWS_PER_PAGE;

  public orders$ = this._facade.store.orders$;

  public status = OrderStatus;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: OrdersPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(page: number = 0) {
    this._facade.api.getOrders(page).pipe(takeUntil(this._destroy$)).subscribe();
  }

  changePage(page: number) {
    this.loadOrders(page - 1);
  }
}
