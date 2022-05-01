import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {regex} from '../../../regex';
import {ISelectedPicture} from './input-file.interface';
import {NO_PICTURE_PATH} from './input-file.const';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent {
  @Output()
  pictureSelected = new EventEmitter<ISelectedPicture>();

  private _picturePath = new BehaviorSubject<string>(NO_PICTURE_PATH);
  public picturePath$ = this._picturePath.asObservable();

  @ViewChild('input', {read: ElementRef}) input?: ElementRef<HTMLInputElement>;

  constructor() { }

  changeFile() {
    if (this.input) {
      const fileList = (this.input.nativeElement.files as FileList);
      const fileName = fileList.length ? fileList[0].name : '';
      const matchedArr = fileName.match(regex.fileName);

      if (matchedArr) {
        this._picturePath.next(matchedArr[1]);
        this.pictureSelected.emit({
          file: fileList,
          path: fileName,
        });
      }
    }
  }

  clearInput() {
    if (this.input) {
      this.input.nativeElement.value = '';
      this._picturePath.next(NO_PICTURE_PATH);
    }
  }
}
