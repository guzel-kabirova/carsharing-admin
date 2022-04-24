import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IFormInfo, IFormSettings} from './auto-card-page.interface';
import {INITIAL_INFO, INITIAL_SETTINGS} from './auto-card-page.const';

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

  private _infoForm = new BehaviorSubject<IFormInfo>(INITIAL_INFO);

  private _settingsForm = new BehaviorSubject<IFormSettings>(INITIAL_SETTINGS);

  constructor() { }

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
    this._infoForm.next(info);
    this.setTotalPercent();
  }

  public changeSettings(settings: IFormSettings) {
    this._settingsForm.next(settings);
    this.setTotalPercent();
  }

  private getInfoValue(): IFormInfo {
    return this._infoForm.getValue();
  }

  private getSettingsValue(): IFormSettings {
    return this._settingsForm.getValue();
  }

  private setTotalPercent() {
    let percent = 0;
    percent += this.getFilledInputPercent(this.getInfoValue());
    percent += this.getFilledInputPercent(this.getSettingsValue());

    this._percent.next(percent);
  }

  private getFilledInputPercent(object: Object): number {
    return Object.values(object).filter(Boolean).length * this._oneFilledInputInPercent;
  }
}
