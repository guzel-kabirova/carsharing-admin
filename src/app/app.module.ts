import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AdminModule} from './admin-layout/admin.module';
import {LogoModule} from './shared/components/logo/logo.module';
import {IconModule} from './shared/components/icon/icon.module';
import {ICONS_PROVIDER} from './app.const';
import {ButtonModule} from './shared/components/button/button.module';
import {AutoCardPageComponent} from './auto-card-page/auto-card-page.component';
import {AutoListPageComponent} from './auto-list-page/auto-list-page.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoCardPageComponent,
    AutoListPageComponent,
    OrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminModule,
    LogoModule,
    IconModule,
    ButtonModule,
  ],
  providers: [ICONS_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {
}
