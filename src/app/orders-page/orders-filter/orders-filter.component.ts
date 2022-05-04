import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IFilterData} from '../order-page.interface';
import {selectTrulyObjectProperties} from '../../shared/utility/selectTrulyObjectProperties';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersFilterComponent implements OnInit {
  @Input()
  public filterData?: IFilterData;

  @Output()
  public filterApplied = new EventEmitter<Partial<IFilterData>>();

  public form?: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      city: '',
      status: '',
    });
  }

  applyFilters() {
    this.filterApplied.emit(selectTrulyObjectProperties(this.form?.value));
  }
}
