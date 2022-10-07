import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {
  date = null;
  rangeDate = null;

  onChange(): void {
  }

  getWeek(result: Date): void {
  }
  constructor() { }

  ngOnInit(): void {
  }
}
