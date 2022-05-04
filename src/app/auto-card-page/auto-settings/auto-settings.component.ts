import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

import {ICategory, IFormSettings} from '../auto-card-page.interface';
import {DestroyService} from '../../shared/services/destroy.service';
import {AutoCardPageFacadeService} from '../services/auto-card-page.facade.service';

@Component({
  selector: 'app-auto-settings',
  templateUrl: './auto-settings.component.html',
  styleUrls: ['./auto-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class AutoSettingsComponent implements OnInit {
  @Input()
  public isFormFull = false;

  @Output()
  public formChanged = new EventEmitter<IFormSettings>();

  @Output()
  public saved = new EventEmitter<void>();

  @Output()
  public canceled = new EventEmitter<void>();

  @Output()
  public deleted = new EventEmitter<void>();

  public get isNameInvalid(): boolean {
    return this.form.get('name')?.touched && this.form.get('name')?.errors?.required;
  }

  public get isCategoryInvalid(): boolean {
    return this.form.get('category')?.touched && this.form.get('category')?.errors?.required;
  }

  public get isColorsInvalid(): boolean {
    return Boolean(this.form.get('color')?.touched && (this.form.get('colors')?.value.length === 0));
  }

  private isPriceMinTouched(): boolean {
    return !!this.form.get('priceMin')?.touched;
  }

  private isPriceMaxTouched(): boolean {
    return !!this.form.get('priceMax')?.touched;
  }

  public get isPriceMin(): boolean {
    return this.isPriceMinTouched() && this.form.get('priceMin')?.errors?.required;
  }

  public get isPriceMax(): boolean {
    return this.isPriceMaxTouched() && this.form.get('priceMax')?.errors?.required;
  }

  public get isPriceMinMinimum(): boolean {
    return this.isPriceMinTouched() && this.form.get('priceMin')?.errors?.min;
  }

  public get isPriceMaxMinimum(): boolean {
    return this.isPriceMaxTouched() && this.form.get('priceMax')?.errors?.min;
  }

  public form!: FormGroup;

  public categories$ = this._facade.appStore.categories$;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
    private _facade: AutoCardPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.createFormChangeSubscription();
    this.addPriceMaxValidationSubscription();
    this.clearFormSubscription();
  }

  private createForm() {
    const defaultSettings = this._facade.autoCardStore.getSettingsValue();
    const colorsControls = defaultSettings.colors.map(color => new FormControl(color));
    const colors = this._fb.array(colorsControls);

    this.form = this._fb.group({
      name: [defaultSettings.name, Validators.required],
      category: [defaultSettings.categoryId?.id, Validators.required],
      priceMin: [defaultSettings.priceMin, [Validators.required, Validators.min(0)]],
      priceMax: [defaultSettings.priceMax, [Validators.required, Validators.min(0)]],
      color: [''],
      colors,
    });
  }

  private createFormChangeSubscription() {
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.formChanged.emit(this.createDataToEmit())),
      takeUntil(this._destroy$))
      .subscribe();
  }

  private addPriceMaxValidationSubscription() {
    this.form.get('priceMin')?.valueChanges.pipe(
      tap(priceMin => {
        this.form.get('priceMax')?.addValidators(Validators.min(priceMin));
        this.form.get('priceMax')?.updateValueAndValidity();
      }),
      takeUntil(this._destroy$),
    )
      .subscribe();
  }

  private createDataToEmit(): IFormSettings {
    const data = {
      ...this.form.value,
      categoryId: this.findCategory(this.form.value.category),
    };
    delete data.category;
    delete data.color;
    return data;
  }

  private findCategory(id: string): ICategory {
    return this._facade.appStore.getCategories().filter(category => category.id === id)[0];
  }

  public addColor() {
    const color = this.form.get('color')?.value.trim();

    if (!!color) {
      const control = new FormControl(color);
      (this.form.get('colors') as FormArray).push(control);
      this.form.patchValue({color: ''});
    }
  }

  public deleteColor(i: number) {
    (this.form.get('colors') as FormArray).removeAt(i);
  }

  public clearForm() {
    this._facade.resetAutoCardForms$.next();
    this.canceled.emit();
  }

  private clearFormSubscription() {
    this._facade.resetAutoCardForms$.pipe(
      tap(() => {
        this.clearFormArray(this.form.get('colors') as FormArray);
        this.form.reset();
      }),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  deleteCar() {
    this.deleted.emit();
    this.clearForm();
  }
}
