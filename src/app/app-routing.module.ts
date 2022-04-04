import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/services/auth.guard';

const routes: Routes = [
  {path: '', component: AuthComponent, pathMatch: 'full'},
  {
    path: 'admin', loadChildren: () => import('./admin-layout/admin.module')
      .then(m => m.AdminModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
