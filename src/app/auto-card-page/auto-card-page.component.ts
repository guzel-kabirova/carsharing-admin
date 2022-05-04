import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

import {ICarDto, IFormInfo, IFormSettings} from './auto-card-page.interface';
import {AutoCardPageFacadeService} from './services/auto-card-page.facade.service';
import {DestroyService} from '../shared/services/destroy.service';
import {INITIAL_INFO, INITIAL_SETTINGS} from './auto-card-page.const';
import {ICar} from '../orders-page/order-page.interface';

@Component({
  selector: 'app-auto-card-page',
  templateUrl: './auto-card-page.component.html',
  styleUrls: ['./auto-card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AutoCardPageComponent implements OnInit {
  private _id = '';
  public percent$ = this._facade.autoCardStore.percent$;

  public get isFormFull(): boolean {
    return this._facade.autoCardStore.getPercent() === 100;
  }

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _facade: AutoCardPageFacadeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(tap(data => this._id = (data as { car: ICar }).car?.id || ''), takeUntil(this._destroy$)).subscribe();
  }

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

      if (!!this._id) {
        this._facade.api.editCar(car).pipe(takeUntil(this._destroy$)).subscribe();
        return;
      }
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
    if (!!this._id) {
      this._facade.api.deleteCar(this._id).pipe(takeUntil(this._destroy$)).subscribe();
      return;
    }
    this.handleCancel();
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
