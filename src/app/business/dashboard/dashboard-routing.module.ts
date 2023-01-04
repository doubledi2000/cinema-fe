import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RULE } from '../../shared/constant/authority.constant';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/shared/core/guard/auth.guard';
import { RevenueReportComponent } from '../report/revenue-report/revenue-report.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueReportComponent,
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
