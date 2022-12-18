import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  option: any = {
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
        data: [
          'CGV HUCE',
          'CGV Cầu Giấy',
          'CGV Thái Nguyên',
          'CGV Trần Duy Hưng',
          'CGV Xuân thuỷ',
          'CGV Thái NGuyênnnnnnnnnnnnnnnnnnn',
          'CGV Thái Hà'
        ],
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
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  option2: any = {
    title: {
      text: 'TỈ lệ mua vé'
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
        data: [
          'CGV HUCE',
          'CGV Cầu Giấy',
          'CGV Thái Nguyên',
          'CGV Trần Duy Hưng',
          'CGV Xuân thuỷ',
          'CGV Thái NGuyênnnnnnnnnnnnnnnnnnn',
          'CGV Thái Hà'
        ],
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
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 80, 70, 76, 60, 90]
      }
    ]
  };
}
