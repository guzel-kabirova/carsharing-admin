import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFilterComponent {
  @Input()
  public text = '';

  constructor() { }
}
