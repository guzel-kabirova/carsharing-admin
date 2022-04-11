import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {InputFileComponent} from './input-file.component';

@NgModule({
  declarations: [InputFileComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [InputFileComponent],
})
export class InputFileModule {
}
