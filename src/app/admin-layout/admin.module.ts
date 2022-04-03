import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminLayoutComponent} from './admin-layout.component';
import {AdminRoutingModule} from './admin-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarItemComponent} from './components/sidebar-item/sidebar-item.component';
import {LogoModule} from '../shared/components/logo/logo.module';
import {FooterComponent} from './components/footer/footer.component';
import {ICONS_PROVIDER} from '../app.const';
import {IconModule} from '../shared/components/icon/icon.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarItemComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LogoModule,
    IconModule,
  ],
  exports: [
    AdminRoutingModule,
  ],
  providers: [ICONS_PROVIDER],
})
export class AdminModule {
}
