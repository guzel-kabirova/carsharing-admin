import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input()
  public idName = '';
  @Input()
  public labelName = '';
  @Input()
  public isChecked = false;

  constructor() { }
}
