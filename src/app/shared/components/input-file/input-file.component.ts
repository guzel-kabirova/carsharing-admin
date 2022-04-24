import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

import {regex} from '../../../regex';
import {ISelectedPicture} from './input-file.interface';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent {
  @Output()
  pictureSelected = new EventEmitter<ISelectedPicture>();

  public picturePath = 'Выберите файл...';

  constructor() { }

  changeFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileList = (input.files as FileList);
    const fileName = fileList.length ? fileList[0].name : '';
    const matchedArr = fileName.match(regex.fileName);

    if (matchedArr) {
      this.picturePath = matchedArr[1];
      this.pictureSelected.emit({
        file: fileList,
        path: fileName,
      });
    }
  }
}
