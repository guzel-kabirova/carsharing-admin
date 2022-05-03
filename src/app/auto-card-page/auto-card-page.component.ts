import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ICarDto, IFormInfo, IFormSettings} from './auto-card-page.interface';
import {AutoCardPageFacadeService} from './services/auto-card-page.facade.service';
import {DestroyService} from '../shared/services/destroy.service';
import {INITIAL_INFO, INITIAL_SETTINGS} from './auto-card-page.const';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AutoCardPageComponent {
  public percent$ = this._facade.autoCardStore.percent$;

  public get isFormFull(): boolean {
    return this._facade.autoCardStore.getPercent() === 100;
  }

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: AutoCardPageFacadeService,
  ) { }

  public handleSave() {
    if (this.isFormFull) {
      const info = this._facade.autoCardStore.getInfoValue();
      const settings = this._facade.autoCardStore.getSettingsValue();
      const thumbnail = this._facade.autoCardStore.getThumbnail();

      const car: ICarDto = {
        name: settings.name,
        colors: settings.colors,
        categoryId: settings.categoryId,
        description: info.description,
        priceMax: settings.priceMax,
        priceMin: settings.priceMin,
        thumbnail,
      };

      this._facade.api.setNewCar(car).pipe(takeUntil(this._destroy$)).subscribe();
    }
  }

  public handleCancel() {
    this.clearStore();
  }

  private clearStore() {
    this._facade.autoCardStore.setSettingsForm(INITIAL_SETTINGS);
    this._facade.autoCardStore.setInfoForm(INITIAL_INFO);
  }

  public handleDelete() {
    console.log('delete');
  }

  public changeInfo(info: IFormInfo) {
    this._facade.autoCardStore.setInfoForm(info);
    this._facade.autoCardStore.setPercent();
  }

  public changeSettings(settings: IFormSettings) {
    this._facade.autoCardStore.setSettingsForm(settings);
    this._facade.autoCardStore.setPercent();
  }
}
