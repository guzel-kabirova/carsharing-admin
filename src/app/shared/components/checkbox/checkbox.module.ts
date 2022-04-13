import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckboxComponent} from './checkbox.component';
import {InputModule} from '../input/input.module';
import {IconModule} from '../icon/icon.module';


@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    InputModule,
    IconModule,
  ],
  exports: [CheckboxComponent],
})
export class CheckboxModule {
}
