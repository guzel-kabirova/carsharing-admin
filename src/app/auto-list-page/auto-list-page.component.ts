import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-auto-list-page',
  templateUrl: './auto-list-page.component.html',
  styleUrls: ['./auto-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoListPageComponent {
  constructor() { }
}
