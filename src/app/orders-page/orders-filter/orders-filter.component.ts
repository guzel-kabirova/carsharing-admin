import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IFilterData} from '../order-page.interface';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersFilterComponent implements OnInit {
  @Input()
  public filterData?: IFilterData;

  public form?: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      interval: null,
      category: null,
      city: null,
      status: null,
    });
  }
}
