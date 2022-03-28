import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AuthComponent} from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AuthComponent,
  ],
})
export class AuthModule {
}
