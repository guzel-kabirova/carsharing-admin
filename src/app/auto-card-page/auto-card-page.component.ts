import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ICarDto, IFormInfo, IFormSettings} from './auto-card-page.interface';
import {AutoCardPageFacadeService} from './services/auto-card-page.facade.service';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCardPageComponent {
  public percent$ = this._facade.store.percent$;

  public get isFormFull(): boolean {
    return this._facade.store.getPercent() === 100;
  }

  constructor(private _facade: AutoCardPageFacadeService) { }

  public handleSave() {
    if (this.isFormFull) {
      const info = this._facade.store.getInfoValue();
      const settings = this._facade.store.getSettingsValue();

      const car: ICarDto = {
        name: settings.name,
        colors: settings.colors,
        categoryId: settings.categoryId,
        description: info.description,
        priceMax: settings.priceMax,
        priceMin: settings.priceMin,
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
    this._facade.store.setPercent();
  }

  public changeSettings(settings: IFormSettings) {
    this._facade.store.setSettingsForm(settings);
    this._facade.store.setPercent();
  }
}
