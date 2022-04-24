import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

import {NO_PICTURE} from './auto-info.const';
import {ISelectedImg} from './auto-info.interface';
import {ISelectedPicture} from '../../shared/components/input-file/input-file.interface';

@Component({
  selector: 'app-auto-info',
  templateUrl: './auto-info.component.html',
  styleUrls: ['./auto-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoInfoComponent {
  @Input()
  public percent = 0;

  private _picture = new BehaviorSubject<ISelectedImg>(NO_PICTURE);
  public picture$ = this._picture.asObservable();

  public form = this._fb.group({
    description: '',
  });

  constructor(private _fb: FormBuilder) { }

  handlePictureSelect(picture: ISelectedPicture) {
    const reader = new FileReader();
    reader.readAsDataURL(picture.file[0]);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this._picture.next({
        src: (event.target?.result as string) ?? '',
        alt: picture.path,
      });
    };
  }
}
