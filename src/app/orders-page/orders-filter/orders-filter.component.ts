import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersFilterComponent {

  constructor() { }
}
