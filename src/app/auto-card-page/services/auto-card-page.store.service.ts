import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ICategory, IFormInfo, IFormSettings} from '../auto-card-page.interface';
import {INITIAL_INFO, INITIAL_SETTINGS} from '../auto-card-page.const';

@Injectable({providedIn: 'root'})
export class AutoCardPageStoreService {
  private _infoForm = new BehaviorSubject<IFormInfo>(INITIAL_INFO);

  private _settingsForm = new BehaviorSubject<IFormSettings>(INITIAL_SETTINGS);
  public settingsForm$ = this._settingsForm.asObservable();

  private _categories = new BehaviorSubject<ICategory[]>([]);

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
    delete settings.color;
    this._settingsForm.next(settings);
  }

  public setCategories(categories: ICategory[]) {
    this._categories.next(categories);
  }

  public getCategories(): ICategory[] {
    return this._categories.getValue();
  }
}
