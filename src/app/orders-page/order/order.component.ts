import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  @Input()
  public carModel = '';
  @Input()
  public location = '';
  @Input()
  public rentDate = '';
  @Input()
  public carColor = '';
  @Input()
  public price = '';

  constructor() { }
}
