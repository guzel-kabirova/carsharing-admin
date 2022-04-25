import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, first, takeUntil, tap} from 'rxjs/operators';

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
  @Output()
  formChanged = new EventEmitter<IFormSettings>();

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

  public get isPriceMinInvalid(): boolean {
    return this.form.get('priceMin')?.touched && this.form.get('priceMin')?.errors?.required;
  }

  public get isPriceMaxInvalid(): boolean {
    return this.form.get('priceMax')?.touched && this.form.get('priceMax')?.errors?.required;
  }

  public form!: FormGroup;

  public categories: ICategory[] = [];
  public isCategoriesLoading = false;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
    private _facade: AutoCardPageFacadeService,
  ) { }

  ngOnInit(): void {
    this.setCategories();
    this.createForm();
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.formChanged.emit(this.form.value)),
      takeUntil(this._destroy$))
      .subscribe();
  }

  private setCategories() {
    this.isCategoriesLoading = true;
    this._facade.api.getCategories().pipe(
      first(),
      tap(() => {
        this.categories = this._facade.store.getCategories();
        this.isCategoriesLoading = false;
      }),
    ).subscribe();
  }

  private createForm() {
    const colors = this._fb.array([]);

    this.form = this._fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      priceMin: ['', Validators.required],
      priceMax: ['', Validators.required],
      color: [''],
      colors,
    });
  }

  addColor() {
    const color = this.form.get('color')?.value.trim();

    if (!!color) {
      const control = new FormControl(color);
      (this.form.get('colors') as FormArray).push(control);
      this.form.patchValue({color: ''});
    }
  }

  deleteColor(i: number) {
    (this.form.get('colors') as FormArray).removeAt(i);
  }
}
