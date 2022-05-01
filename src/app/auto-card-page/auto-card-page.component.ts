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
  public percent$ = this._facade.store.percent$;

  public get isFormFull(): boolean {
    return this._facade.store.getPercent() === 100;
  }

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: AutoCardPageFacadeService,
  ) { }

  public handleSave() {
    if (this.isFormFull) {
      const info = this._facade.store.getInfoValue();
      const settings = this._facade.store.getSettingsValue();
      const thumbnail = this._facade.store.getThumbnail();

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
    this._facade.store.setSettingsForm(INITIAL_SETTINGS);
    this._facade.store.setInfoForm(INITIAL_INFO);
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
