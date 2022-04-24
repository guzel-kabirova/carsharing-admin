import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

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
import {PaginationModule} from './shared/components/pagination/pagination.module';
import {AutoInfoComponent} from './auto-card-page/auto-info/auto-info.component';
import {AutoSettingsComponent} from './auto-card-page/auto-settings/auto-settings.component';
import {OrdersFilterComponent} from './orders-page/orders-filter/orders-filter.component';
import {OrderComponent} from './orders-page/order/order.component';
import {InputFilterModule} from './shared/components/input-filter/input-filter.module';
import {AutoListFilterComponent} from './auto-list-page/auto-list-filter/auto-list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoCardPageComponent,
    AutoListPageComponent,
    OrdersPageComponent,
    AutoInfoComponent,
    AutoSettingsComponent,
    OrdersFilterComponent,
    OrderComponent,
    AutoListFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AdminModule,
    LogoModule,
    IconModule,
    ButtonModule,
    PaginationModule,
    InputFilterModule,
    ReactiveFormsModule,
  ],
  providers: [ICONS_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {
}
