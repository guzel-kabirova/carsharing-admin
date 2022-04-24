import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-auto-settings',
  templateUrl: './auto-settings.component.html',
  styleUrls: ['./auto-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoSettingsComponent {
  @Output()
  public saved = new EventEmitter<void>();

  @Output()
  public canceled = new EventEmitter<void>();

  @Output()
  public deleted = new EventEmitter<void>();

  public form = this._fb.group({
    name: '',
    category: '',
    colors: '',
  });

  constructor(private _fb: FormBuilder) { }
}
