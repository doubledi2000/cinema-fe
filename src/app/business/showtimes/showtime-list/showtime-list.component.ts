import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import CommonUtil from 'src/app/shared/utils/common-util';
import * as moment from 'moment';
import { DATE_CONSTANT } from 'src/app/shared/constant/date.constant';
import { DatePickerCustom } from 'src/app/shared/model/date-picker.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
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
