import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-auto-settings',
  templateUrl: './auto-settings.component.html',
  styleUrls: ['./auto-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoSettingsComponent {
  constructor() { }
}
