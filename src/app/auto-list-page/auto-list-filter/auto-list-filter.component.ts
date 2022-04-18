import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-auto-list-filter',
  templateUrl: './auto-list-filter.component.html',
  styleUrls: ['./auto-list-filter.component.scss', '../../orders-page/orders-filter/orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoListFilterComponent {
  constructor() { }
}
