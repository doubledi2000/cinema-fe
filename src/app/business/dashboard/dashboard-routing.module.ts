import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RULE } from '../../shared/constant/authority.constant';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/shared/core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.REPORT_VIEW]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
