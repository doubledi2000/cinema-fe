import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/service/report.service';
import { IOccupancyDetailReportResponse } from '../../../shared/model/response/occupancy-detail-report.model';

@Component({
  selector: 'app-occupancy-report',
  templateUrl: './occupancy-report.component.html',
  styleUrls: ['./occupancy-report.component.scss']
})
export class OccupancyReportComponent implements OnInit {

  occupancyDetails: IOccupancyDetailReportResponse[] = [];

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.reportService.occupancyDetail({type:'DEFAULT'}).subscribe(res => {
      if(res && res.success) {
        this.occupancyDetails = res.data as IOccupancyDetailReportResponse[];
      }
    })
  }

}
