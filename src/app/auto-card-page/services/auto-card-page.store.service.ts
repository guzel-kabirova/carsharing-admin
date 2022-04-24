import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {IFormInfo, IFormSettings} from '../auto-card-page.interface';
import {INITIAL_INFO, INITIAL_SETTINGS} from '../auto-card-page.const';

@Injectable({providedIn: 'root'})
export class AutoCardPageStoreService {
  private _infoForm = new BehaviorSubject<IFormInfo>(INITIAL_INFO);

  private _settingsForm = new BehaviorSubject<IFormSettings>(INITIAL_SETTINGS);
  public settingsForm$ = this._settingsForm.asObservable();

  public setInfoForm(info: IFormInfo) {
    this._infoForm.next(info);
  }

  public getInfoValue(): IFormInfo {
    return this._infoForm.getValue();
  }

  public getSettingsValue(): IFormSettings {
    return this._settingsForm.getValue();
  }

  public setSettingsForm(settings: IFormSettings) {
    this._settingsForm.next({name: settings.name, colors: settings.colors, category: settings.category});
  }

}
