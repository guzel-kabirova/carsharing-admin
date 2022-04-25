import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ICarDto, IFormInfo, IFormSettings} from './auto-card-page.interface';
import {AutoCardPageFacadeService} from './services/auto-card-page.facade.service';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCardPageComponent {
  private _oneFilledInputInPercent = 14.3;

  private _percent = new BehaviorSubject<number>(0);
  public percent$ = this._percent.asObservable();

  constructor(private _facade: AutoCardPageFacadeService) { }

  public handleSave() {
    if (this._percent.getValue() === 100) {
      const info = this._facade.store.getInfoValue();
      const settings = this._facade.store.getSettingsValue();

      const car: ICarDto = {
        name: settings.name,
        colors: settings.colors,
        categoryId: 5,
        description: info.description,
        priceMax: 500,
        priceMin: 0,
        thumbnail: {
          path: info.url,
        },
      };

      this._facade.api.setNewCar(car).subscribe();
    }
  }

  public handleCancel() {
    console.log('cancel');
  }

  public handleDelete() {
    console.log('delete');
  }

  public changeInfo(info: IFormInfo) {
    this._facade.store.setInfoForm(info);
    this.setTotalPercent();
  }

  public changeSettings(settings: IFormSettings) {
    this._facade.store.setSettingsForm(settings);
    this.setTotalPercent();
  }

  private setTotalPercent() {
    let percent = 0;
    percent += this.getFilledInputPercent(this._facade.store.getInfoValue());
    percent += this.getFilledInputPercent(this._facade.store.getSettingsValue());

    percent = Math.min(percent, 100);
    this._percent.next(percent);
  }

  private getFilledInputPercent(object: object): number {
    return Object.values(object).filter(value => value !== 0 && value.length !== 0).length * this._oneFilledInputInPercent;
  }
}
