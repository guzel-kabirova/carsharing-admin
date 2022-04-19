import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFilterComponent} from './input-filter.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [InputFilterComponent],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [InputFilterComponent],
})
export class InputFilterModule {
}
