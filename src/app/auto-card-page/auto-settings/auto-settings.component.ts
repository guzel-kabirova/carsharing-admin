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

  public categories$ = this._facade.api.getCategories();

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
    private _facade: AutoCardPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.formChanged.emit(this.createDataToEmit());
      }),
      takeUntil(this._destroy$))
      .subscribe();
  }

  private createForm() {
    const colors = this._fb.array([]);

    this.form = this._fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      priceMin: ['', [Validators.required, Validators.min(0)]],
      priceMax: ['', [Validators.required, Validators.min(0)]],
      color: [''],
      colors,
    });
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
    return this._facade.store.getCategories().filter(category => category.id === id)[0];
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
}
