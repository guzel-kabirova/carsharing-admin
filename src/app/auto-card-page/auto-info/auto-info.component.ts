import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

import {NO_PICTURE} from './auto-info.const';
import {ISelectedImg} from './auto-info.interface';
import {ISelectedPicture} from '../../shared/components/input-file/input-file.interface';
import {DestroyService} from '../../shared/services/destroy.service';
import {IFormInfo} from '../auto-card-page.interface';
import {AutoCardPageFacadeService} from '../services/auto-card-page.facade.service';

@Component({
  selector: 'app-auto-info',
  templateUrl: './auto-info.component.html',
  styleUrls: ['./auto-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AutoInfoComponent implements OnInit {
  private _percent = 0;

  @Input()
  public set percent(percent: number | null) {
    this._percent = percent ? percent : 0;
  }

  public get percent(): number {
    return this._percent;
  }

  @Output()
  public formChanged = new EventEmitter<IFormInfo>();

  private _picture = new BehaviorSubject<ISelectedImg>(NO_PICTURE);
  public picture$ = this._picture.asObservable();

  public form!: FormGroup;

  public settingsForm$ = this._facade.store.settingsForm$;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
    private _facade: AutoCardPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.createFormChangeSubscription();
  }

  private createForm() {
    const defaultInfo = this._facade.store.getInfoValue();
    this.form = this._fb.group({
      url: defaultInfo.url,
      description: defaultInfo.description,
    });
  }

  private createFormChangeSubscription() {
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.formChanged.emit(this.form.value)),
      takeUntil(this._destroy$),
    )
      .subscribe();
  }

  public handlePictureSelect(picture: ISelectedPicture) {
    const reader = new FileReader();
    const file = picture.file[0];
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const url = event.target?.result as string ?? '';
      this.form.patchValue({url});
      this._picture.next({
        src: url,
        alt: picture.path,
      });

      this._facade.store.setThumbnail({
        size: file.size,
        mimetype: file.type,
        originalname: file.name,
        path: url,
      });
    };
  }
}
