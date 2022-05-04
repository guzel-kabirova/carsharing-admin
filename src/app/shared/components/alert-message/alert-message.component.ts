import {ChangeDetectionStrategy, Component} from '@angular/core';

import {AlertService} from '../../services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertMessageComponent {
  alert$ = this._service.alert$;

  constructor(private _service: AlertService) { }
}
