import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {IFormInfo, IFormSettings} from './auto-card-page.interface';
import {AutoCardPageStoreService} from './services/auto-card-page.store.service';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCardPageComponent {
  private _oneFilledInputInPercent = 20;

  private _percent = new BehaviorSubject<number>(0);
  public percent$ = this._percent.asObservable();

  constructor(private _autoStoreService: AutoCardPageStoreService) { }

  public handleSave() {
    console.log('saved');
  }

  public handleCancel() {
    console.log('cancel');
  }

  public handleDelete() {
    console.log('delete');
  }

  public changeInfo(info: IFormInfo) {
    this._autoStoreService.setInfoForm(info);
    this.setTotalPercent();
  }

  public changeSettings(settings: IFormSettings) {
    this._autoStoreService.setSettingsForm(settings);
    this.setTotalPercent();
  }

  private setTotalPercent() {
    let percent = 0;
    percent += this.getFilledInputPercent(this._autoStoreService.getInfoValue());
    percent += this.getFilledInputPercent(this._autoStoreService.getSettingsValue());

    this._percent.next(percent);
  }

  private getFilledInputPercent(object: object): number {
    return Object.values(object).filter(value => value.length !== 0).length * this._oneFilledInputInPercent;
  }
}
