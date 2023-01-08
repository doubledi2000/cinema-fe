import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReportService } from '../../../shared/service/report.service';
import { IRevenueReport } from '../../../shared/model/response/revenue-report.model';

@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.scss']
})
export class RevenueReportComponent implements OnInit {
  revenueReports: IRevenueReport[] = [];
  searchForm!: FormGroup;
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
  }

  search(){
    this.reportService.revenueReport({}).subscribe(res => {
      this.revenueReports = res.data as IRevenueReport[];
    })
  }

  getIndex(i: number){

  }

}
