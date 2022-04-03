import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AdminModule} from './admin-layout/admin.module';
import {LogoModule} from './shared/components/logo/logo.module';
import {IconModule} from './shared/components/icon/icon.module';
import {ICONS_PROVIDER} from './app.const';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminModule,
    LogoModule,
    IconModule,
  ],
  providers: [ICONS_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {
}
