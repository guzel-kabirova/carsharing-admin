import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

import {IFormSettings} from '../auto-card-page.interface';
import {DestroyService} from '../../shared/services/destroy.service';

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

  public form!: FormGroup;

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.formChanged.emit(this.form.value)),
      takeUntil(this._destroy$))
      .subscribe();
  }

  private createForm() {
    const colors = this._fb.array([]);

    this.form = this._fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
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
