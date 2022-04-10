import {ChangeDetectionStrategy, Component} from '@angular/core';
import {APP_URL} from '../../../app.const';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public appUrl = APP_URL;

  constructor() { }
}
