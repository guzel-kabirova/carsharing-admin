import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IFilterDataAuto} from '../auto-list-page.interface';
import {selectTrulyObjectProperties} from '../../shared/utility/selectTrulyObjectProperties';

@Component({
  selector: 'app-auto-list-filter',
  templateUrl: './auto-list-filter.component.html',
  styleUrls: ['./auto-list-filter.component.scss', '../../orders-page/orders-filter/orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoListFilterComponent implements OnInit {
  @Input()
  filterData?: IFilterDataAuto;

  @Output()
  filterApplied = new EventEmitter<Partial<IFilterDataAuto>>();

  @Output()
  filterCleared = new EventEmitter<void>();

  public form!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      category: '',
    });
  }

  public applyFilters() {
    this.filterApplied.emit(selectTrulyObjectProperties(this.form.value));
  }

  public clearFilters() {
    this.filterCleared.emit();
    this.form.setValue({
      category: '',
    });
  }
}
