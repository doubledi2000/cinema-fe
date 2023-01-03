import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../shared/service/report.service';
import { IOccupancyReportResponse } from '../../shared/model/response/occupancy-report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.loadRevenueReport();
    this.loadOccupancyReporot();
  }

  loadRevenueReport(){
    this.reportService.revenueReport({type:'MONTH'}).subscribe(res => {
      if(res && res.success) {
        const legends = res?.data.map(e => e.locationName);
        const series = res?.data.map(e => e.totalRevenue);
        this.initRevenueReport(legends, series);
      }
    })
  }

  revenueOption: any = {};
  occupancyOption: any = {};

  initRevenueReport(legends?: string[], series?: number[]) {
    this.revenueOption = {
      title: {
        text: 'Báo cáo doanh thu'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          magicType: {
            show: true,
            type: ['line', 'bar'],
            title: {
              line: 'Biểu đồ đường',
              bar: 'Biểu đồ cột'
            }
          },
          saveAsImage: {}
        }
      },
      xAxis: [
        {
          type: 'category',
          data: legends,
          axisLabel: { rotate: -40 }
        }
      ],
      dataZoom: {
        start: 0,
        type: 'inside'
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Doanh thu  ',
          type: 'bar',
          barWidth: '60%',
          data: series
        }
      ]
    };
  }


  loadOccupancyReporot(){
    this.reportService.occupancyReport({}).subscribe(res => {
      if(res && res.success) {
        const data = res?.data as IOccupancyReportResponse[];
        const legends = data.map(e => e.filmName);
        const ticketWasSold = data.map(e => e.totalTicketWasSold);
        const ticketWasUnsold = data.map(e => e.totalTicket - e.totalTicketWasSold);
        this.initOccupancyReport(legends, ticketWasSold, ticketWasUnsold);
      }
    })
  }

  initOccupancyReport(legends?: string[], ticketWasSold?: number[], ticketWasUnsold?: number[]){
    this.occupancyOption =  {
      title: {
        text: 'Tỉ lệ mua vé theo phim'
      },
      legend: {
        data: ['bar'],
        left: '10%'
      },
      brush: {
        xAxisIndex: 0
      },

      tooltip: {},
      xAxis: {
        data: legends,
        name: 'Phim',
        axisLabel: { rotate: -40 },
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {
        name: 'Số lượng vé',
      },
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'Vé đá bán',
          type: 'bar',
          stack: 'one',
          data: ticketWasSold
        },
        {
          name: 'Vé chưa bán',
          type: 'bar',
          stack: 'one',
          data: ticketWasUnsold
        }
      ]
    };
  }

}
