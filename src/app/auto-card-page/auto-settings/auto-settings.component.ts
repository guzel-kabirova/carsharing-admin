import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
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
    return this.form.get('colors')?.touched && this.form.get('colors')?.errors?.required;
  }

  public form = this._fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    colors: ['', Validators.required],
  });

  constructor(
    @Inject(DestroyService) private _destroy$: Observable<void>,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.formChanged.emit(this.form.value)),
      takeUntil(this._destroy$))
      .subscribe();
  }
}
