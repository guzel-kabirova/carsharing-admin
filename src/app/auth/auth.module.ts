import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';
import {LogoModule} from '../shared/components/logo/logo.module';
import {ErrorPageComponent} from '../error-page/error-page.component';

@NgModule({
  declarations: [
    AuthComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LogoModule,
  ],
  exports: [
    AuthComponent,
  ],
})
export class AuthModule {
}
