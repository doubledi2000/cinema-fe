import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DATE_CONSTANT, DATE_NAME_EN, TIME_CONSTANT } from 'src/app/shared/constant/date.constant';
import { ConfigPrice } from 'src/app/shared/model/config-price.model';
import { PriceByTime } from 'src/app/shared/model/price-by-time.model';
import CommonUtil from '../../../shared/utils/common-util';
import { AddPriceModalComponent } from './add-price-modal/add-price-modal.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-ticket-price',
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.scss']
})
export class TicketPriceComponent implements OnInit {
  isVisible = false;
  priceByTime: PriceByTime[] = [];
  mondayConfigPrice: ConfigPrice[] = [];
  tuesdayConfigprice: ConfigPrice[] = [];
  wednesdayConfigPrice: ConfigPrice[] = [];
  thursdayConfigPrice: ConfigPrice[] = [];
  fridayConfigPrice: ConfigPrice[] = [];
  saturdayConfigPrice: ConfigPrice[] = [];
  sundayConfigPrice: ConfigPrice[] = [];

  panels = [
    {
      active: true,
      name: 'Thứ 2',
      disabled: false,
      data: DATE_NAME_EN.MON
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 3',
      data: DATE_NAME_EN.TUES
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 4',
      data: DATE_NAME_EN.WED
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 5',
      data: DATE_NAME_EN.THURS
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 6',
      data: DATE_NAME_EN.FRI
    },
    {
      active: false,
      disabled: false,
      name: 'Thứ 7',
      data: DATE_NAME_EN.SAT
    },
    {
      active: false,
      disabled: false,
      name: 'Chủ nhật',
      data: DATE_NAME_EN.SUN
    },
  ];
  form: FormGroup = new FormGroup({});


  object: any;


  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService
  ) { }

  initForm(){

    this.form = this.fb.group({
      id: '',
      basement: '',
      configPrices: this.fb.array([
        this.fb.group({
          name: 'Thứ 2',
          priceByTimes: this.fb.array([

          ])
        })
      ])
    })
    console.log(this.form)
  }

  date!: Date;
  ngOnInit(): void {
    this.date = new Date();
    this.initForm();

  }
  startTime: Date = new Date();
  endTime: Date = new Date();

  deletePriceByTime(data: any, index: number){
    data.get('priceByTimes').removeAt(index);
  }

  getListConfigPrice(data: any): ConfigPrice[]{
    switch(data){
      case DATE_NAME_EN.SUN:
        return this.sundayConfigPrice;
      case DATE_NAME_EN.MON:
        return this.mondayConfigPrice;
      case DATE_NAME_EN.TUES:
        return this.tuesdayConfigprice;
      case DATE_NAME_EN.WED:
        return this.wednesdayConfigPrice;
      case DATE_NAME_EN.THURS:
        return this.thursdayConfigPrice;
      case DATE_NAME_EN.FRI:
        return this.fridayConfigPrice;
      case DATE_NAME_EN.SAT:
        return this.saturdayConfigPrice;
      default:
        return [];
      }
  }

  formatNumberToTime(param?: number): string {
    if (!param) {
      return '00:00';
    }
    const hours = Math.floor(param / 60);
    const minutes = param - hours * 60;
    return `${hours}:${minutes}`;
  }

  formatTimeToNumber(param?: Date): number {
    if (!param) {
      return 0;
    }
    const time = new Date(param);
    const hours = time.getHours() * 60;
    const minutes = time.getMinutes();
    return hours + minutes;
  }

  getDateByNumber(config: any): Date{
    return  moment(this.formatNumberToTime(config.endAt), TIME_CONSTANT.HH_mm).toDate();
  }

  showModal(panel: any): void {
    const base = CommonUtil.modalBase(
      AddPriceModalComponent,
      {},
      '30%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        panel.push(this.fb.group({
          id:'',
          startAt: CommonUtil.getTime(result.value.startTime),
          endAt:  CommonUtil.getTime(result.value.getEndTime),
        }))
      }
      console.log(this.form.value)
    })
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
