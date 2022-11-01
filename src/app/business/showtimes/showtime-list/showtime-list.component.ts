import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import CommonUtil from 'src/app/shared/utils/common-util';
import * as moment from 'moment';
import { DATE_CONSTANT } from 'src/app/shared/constant/date.constant';
import { DatePickerCustom } from 'src/app/shared/model/date-picker.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookingComponent } from '../booking/booking.component';
@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {
  rangeDate = null;
  dateSelected = new Date();

  public date = moment();
  public dateForm?: FormGroup = new FormGroup({});

  public isReserved: any;

  public daysArr:DatePickerCustom[] = [];

  public maxSeatOfRow = 18;

  constructor(private _fb: FormBuilder,
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef
    ) {
  }


  public ngOnInit() {
    this.getDays();
    this.dateSelected = new Date();
  }


  getDays(){
    let date = new Date();
    for(let i = 0; i < 10;i++){
      let d = new Date(date.getTime() + i * (24 * 60 * 60 * 1000))
      this.daysArr.push({date: d, isSeleted:i==0 ? true : false});
    }
  }

  openBookingComponent(){
    const modal = this._modal.create({
      nzTitle: 'Modal Title',
      nzContent: BookingComponent,
      nzViewContainerRef: this._viewContainerRef,
      nzWidth: this.maxSeatOfRow * 63
    })
  }
  
  changeSeletedDate(day: any){
    this.dateSelected = day.date;
    this.daysArr.forEach((d)=>{
      d.isSeleted = false;
    })
    day.isSeleted = true;
  }
  isToday(date: Date){
    return date.getDate() === new Date().getDate();
  }

  getDay(dateSelected: Date):string {
    return CommonUtil.getDay(dateSelected);
  }

  pareseDay(d : any) {
    if(d.date instanceof Date) {
      return CommonUtil.getDay(d.date);
    }
    return '';
  }

  getDate(day: Date): string{
    return moment(day).format(DATE_CONSTANT.DDMMYYYY_HYPHEN);
  }

  getMonth(day: any) {
    return day.date.getMonth() + 1;
  }
}
