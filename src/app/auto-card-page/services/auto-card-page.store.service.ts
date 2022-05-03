import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {IFormInfo, IFormSettings, IThumbnail} from '../auto-card-page.interface';
import {INITIAL_INFO, INITIAL_SETTINGS} from '../auto-card-page.const';
import {selectTrulyObjectProperties} from '../../shared/utility/selectTrulyObjectProperties';
import {NO_THUMBNAIL} from '../auto-info/auto-info.const';

@Injectable({providedIn: 'root'})
export class AutoCardPageStoreService {
  private _oneFilledInputInPercent = 14.3;

  private _infoForm = new BehaviorSubject<IFormInfo>(INITIAL_INFO);
  private _thumbnail = new BehaviorSubject<IThumbnail>(NO_THUMBNAIL);

  private _settingsForm = new BehaviorSubject<IFormSettings>(INITIAL_SETTINGS);
  public settingsForm$ = this._settingsForm.asObservable();

  private _percent = new BehaviorSubject<number>(0);
  public percent$ = this._percent.asObservable();

  public setInfoForm(info: IFormInfo) {
    this._infoForm.next(info);
  }

  public getInfoValue(): IFormInfo {
    return this._infoForm.getValue();
  }

  public setThumbnail(thumbnail: IThumbnail) {
    this._thumbnail.next(thumbnail);
  }

  public getThumbnail(): IThumbnail {
    return this._thumbnail.getValue();
  }

  public getSettingsValue(): IFormSettings {
    return this._settingsForm.getValue();
  }

  public setSettingsForm(settings: IFormSettings) {
    this._settingsForm.next(settings);
  }

  public getPercent() {
    return this._percent.getValue();
  }

  public setPercent() {
    let percent = 0;
    percent += this.getFilledInputPercent(this.getInfoValue());
    percent += this.getFilledInputPercent(this.getSettingsValue());

    percent = Math.min(percent, 100);
    this._percent.next(percent);
  }

  private getFilledInputPercent(object: object): number {
    return this.getFilledInputsNumber(object) * this._oneFilledInputInPercent;
  }

  private getFilledInputsNumber(object: object): number {
    return Object.keys(selectTrulyObjectProperties(object)).length;
  }
}
