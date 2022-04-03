import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AdminModule} from './admin-layout/admin.module';
import {LogoModule} from './shared/components/logo/logo.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
