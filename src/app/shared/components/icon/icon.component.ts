import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';

import {ICONS_PATH} from './icons.path';

@Component({
  selector: 'svg[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  icon = '';

  constructor(@Inject(ICONS_PATH) private readonly path: string) {}

  get href(): string {
    return `${this.path}/${this.icon}.svg#${this.icon}`;
  }
}
