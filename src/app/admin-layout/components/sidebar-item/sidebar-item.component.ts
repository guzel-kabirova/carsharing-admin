import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  @Input()
  public name = '';
  @Input()
  public link = '';

  constructor() { }
}
