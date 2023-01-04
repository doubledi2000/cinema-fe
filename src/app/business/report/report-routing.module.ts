import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';
import { AuthGuard } from '../../shared/core/guard/auth.guard';
import { RULE } from '../../shared/constant/authority.constant';
import { OccupancyReportComponent } from './occupancy-report/occupancy-report.component';

const routes: Routes = [
  {
    path: 'revenue',
    component: RevenueReportComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.REPORT_VIEW]
    }
  },
  {
    path: 'occupancy',
    component: OccupancyReportComponent,
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
export class ReportRoutingModule { }
