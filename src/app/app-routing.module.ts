import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTER_UTILS } from './shared/utils/router.utils';
import { AuthLayoutComponent } from './shared/core/layout/auth-layout/auth-layout.component';
import { Page404Component } from './business/auth/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
  {
    path: ROUTER_UTILS.authentication.root,
    component: AuthLayoutComponent,
    loadChildren: () => import('./business/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
