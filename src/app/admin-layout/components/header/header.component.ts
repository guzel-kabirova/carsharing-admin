import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  exitModalOpen = false;

  @Output()
  public clickedToExit = new EventEmitter<void>();
  @Output()
  public clickedToSidebar = new EventEmitter<void>();

  constructor() { }
}
