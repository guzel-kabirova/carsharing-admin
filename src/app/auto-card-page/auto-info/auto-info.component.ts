import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-auto-info',
  templateUrl: './auto-info.component.html',
  styleUrls: ['./auto-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoInfoComponent {
  constructor() { }
}
