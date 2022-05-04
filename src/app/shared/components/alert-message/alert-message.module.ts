import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertMessageComponent} from './alert-message.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
  declarations: [AlertMessageComponent],
  imports: [CommonModule, IconModule],
  exports: [AlertMessageComponent],
})
export class AlertMessageModule {
}
