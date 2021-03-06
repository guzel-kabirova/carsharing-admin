import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ErrorPageComponent} from '../error-page/error-page.component';
import {AdminLayoutComponent} from './admin-layout.component';
import {AutoCardPageComponent} from '../auto-card-page/auto-card-page.component';
import {AutoListPageComponent} from '../auto-list-page/auto-list-page.component';
import {OrdersPageComponent} from '../orders-page/orders-page.component';
import {CheckboxModule} from '../shared/components/checkbox/checkbox.module';
import {InputFileModule} from '../shared/components/input-file/input-file.module';
import {InputModule} from '../shared/components/input/input.module';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: 'card', component: AutoCardPageComponent},
      {path: 'list', component: AutoListPageComponent},
      {path: 'orders', component: OrdersPageComponent},
      {path: 'error', component: ErrorPageComponent},
      {path: '**', redirectTo: '/admin/error'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    CheckboxModule,
    InputFileModule,
    InputModule,
  ],
})
export class AdminRoutingModule {

}
