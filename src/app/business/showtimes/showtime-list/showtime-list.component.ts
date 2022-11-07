import { getLocaleFirstDayOfWeek, DatePipe } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { getISOWeek } from 'date-fns';

import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import CommonUtil from 'src/app/shared/utils/common-util';
import * as moment from 'moment';
import { DATE_CONSTANT } from 'src/app/shared/constant/date.constant';
import { DatePickerCustom } from 'src/app/shared/model/date-picker.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { BookingComponent } from '../booking/booking.component';
import { ShowtimeService } from '../../../shared/service/showtime.service';
import { IShowtime, Showtime } from '../../../shared/model/showtime.model';
import { IShowtimeByFilm } from '../../../shared/model/response/IShowtimeByFilm.model';
@Component({
  selector: 'app-showtime-list',
  templateUrl: './showtime-list.component.html',
  styleUrls: ['./showtime-list.component.scss']
})
export class ShowtimeListComponent implements OnInit {
  rangeDate = null;
  dateSelected = new Date();
  detail?: Showtime

  public date = moment();

  public isReserved: any;

  public daysArr:DatePickerCustom[] = [];

  public maxSeatOfRow = 18;
  public showtimeList: IShowtimeByFilm[] = [];

  constructor(private _fb: FormBuilder,
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private showtimeService: ShowtimeService,
    private datePipe: DatePipe,
    private modalService: NzModalService
    ) {
  }


  public ngOnInit() {
    this.getDays();
    this.dateSelected = new Date();
    this.loadShowtimes();
  }

  loadShowtimes(){
    const params = {
      startTime: 0,
      premierDate: '2022-11-06'
    }
    this.showtimeService.search(params).subscribe(response=>{
      if(response && response.success) {
        this.showtimeList = response.data as IShowtime[];
      }
    })
  }

  printTime(data: any){
    const hourStart = Math.floor(data.startAt / 60);
    const miniuteStart = data.startAt - hourStart * 60;
    let hourStartStr = '';
    let miniuteStartStr = '';
    if(hourStart < 10) {
      hourStartStr = '0' + hourStart;
    }else {
      hourStartStr += hourStart;
    }
    if(miniuteStart < 10) {
      miniuteStartStr = '0' + miniuteStart;
    }else {
      miniuteStartStr+=miniuteStart
    }
    return hourStartStr + ':' + miniuteStartStr ;
  }
  getDays(){
    let date = new Date();
    for(let i = 0; i < 10;i++){
      let d = new Date(date.getTime() + i * (24 * 60 * 60 * 1000))
      this.daysArr.push({date: d, isSeleted:i==0 ? true : false});
    }
  }

  booking(detail: Showtime){
    let modal: NzModalRef;
    this.showtimeService.findById(detail.id).subscribe(res => {
      if(res && res.success) {
        const base = CommonUtil.modalBase(
          BookingComponent,
          {
            isUpdate: true,
            detail: res.data,
          },
          '40%%'
        )
        modal = this.modalService.create(base);
        modal.afterClose.subscribe((result)=>{
          if(result && result?.success) {
          }
        })
      }
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
