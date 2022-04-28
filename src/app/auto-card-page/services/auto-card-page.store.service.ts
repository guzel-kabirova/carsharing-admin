import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ICategory, IFormInfo, IFormSettings} from '../auto-card-page.interface';
import {INITIAL_INFO, INITIAL_SETTINGS} from '../auto-card-page.const';
import {selectTrulyObjectProperties} from '../../shared/utility/selectTrulyObjectProperties';

@Injectable({providedIn: 'root'})
export class AutoCardPageStoreService {
  private _oneFilledInputInPercent = 14.3;

  private _infoForm = new BehaviorSubject<IFormInfo>(INITIAL_INFO);

  private _settingsForm = new BehaviorSubject<IFormSettings>(INITIAL_SETTINGS);
  public settingsForm$ = this._settingsForm.asObservable();

  private _categories = new BehaviorSubject<ICategory[]>([]);
  public categories$ = this._categories.asObservable();

  private _percent = new BehaviorSubject<number>(0);
  public percent$ = this._percent.asObservable();

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
    this._settingsForm.next(settings);
  }

  public setCategories(categories: ICategory[]) {
    this._categories.next(categories);
  }

  public getCategories(): ICategory[] {
    return this._categories.getValue();
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
