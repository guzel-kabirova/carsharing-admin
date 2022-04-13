import {ChangeDetectionStrategy, Component} from '@angular/core';

import {regex} from '../../../regex';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent {
  public picturePath = '';

  get pictureName(): string {
    const nameArr = this.picturePath.match(regex.fileName);
    if (nameArr) {
      return nameArr[1];
    }
    return 'Выберите файл...';
  }

  constructor() { }
}
