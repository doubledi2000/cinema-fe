import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';
import { OccupancyReportComponent } from './occupancy-report/occupancy-report.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RevenueReportComponent,
    OccupancyReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ],
  exports: [
    RevenueReportComponent
  ]
})
export class ReportModule { }
