import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ErrorPageComponent} from '../error-page/error-page.component';
import {AdminLayoutComponent} from './admin-layout.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: 'error', component: ErrorPageComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {

}
