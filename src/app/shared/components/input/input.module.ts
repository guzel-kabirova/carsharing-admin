import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputComponent} from './input.component';
import {LabelComponent} from './label/label.component';
import {ErrorComponent} from './error/error.component';


@NgModule({
  declarations: [InputComponent, LabelComponent, ErrorComponent],
  imports: [
    CommonModule,
  ],
  exports: [InputComponent, LabelComponent, ErrorComponent],
})
export class InputModule {
}
