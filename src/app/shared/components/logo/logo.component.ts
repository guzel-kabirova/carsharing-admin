import {ChangeDetectionStrategy, Component} from '@angular/core';

import {APP_URL} from '../../../app.const';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  public appUrl = APP_URL;

  constructor() { }
}
