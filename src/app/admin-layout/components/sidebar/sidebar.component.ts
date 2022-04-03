import {ChangeDetectionStrategy, Component} from '@angular/core';

import {MENU_ITEMS} from './sidebar.const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public menuItems = MENU_ITEMS;

  constructor() { }
}
