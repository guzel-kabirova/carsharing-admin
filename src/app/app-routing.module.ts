import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent, pathMatch: 'full'},
  {
    path: 'admin', loadChildren: () => import('./admin-layout/admin.module')
      .then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
