import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DATE_CONSTANT, DATE_NAME_EN, TIME_CONSTANT } from 'src/app/shared/constant/date.constant';
import { ConfigPrice } from 'src/app/shared/model/config-price.model';
import { PriceByTime } from 'src/app/shared/model/price-by-time.model';

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
    private fb: FormBuilder
  ) { }

  initForm(){
    let configPrices: FormArray = new FormArray([]);

    configPrices = new FormArray([
      new FormGroup({
      name: new FormControl('Thu 2'),
      active: new FormControl(true),
      disable: new FormControl(true),
      configPrice: new FormArray([
        new FormGroup({
         id: new FormControl('1'),
         startAt: new FormControl(0),
         endAt: new FormControl(600),
         priceByTimes: new FormArray([
          new FormGroup({
            id: new FormControl('1'),
            price: new FormControl(1000000),
            type: new FormControl('NORMAL')
          }),
          new FormGroup({
            id: new FormControl('2'),
            price: new FormControl(1200000),
            type: new FormControl('VIP')
          }),
          new FormGroup({
            id: new FormControl('3'),
            price: new FormControl(1300000),
            type: new FormControl('DOUBLE')
          })
         ]),
        })
      ])
    })
    ])
    // configPrices.push(this.fb.group({
    //   name: new FormControl('Thứ 3'),
    //   active: new FormControl(false),
    //   disable: new FormControl(false),
    //   configPrice: new FormControl(this.tuesdayConfigprice)
    // }));
    // configPrices.push(this.fb.group(this.wednesdayConfigPrice));
    // configPrices.push(this.fb.group(this.thursdayConfigPrice));
    // configPrices.push(this.fb.group(this.fridayConfigPrice));
    // configPrices.push(this.fb.group(this.saturdayConfigPrice));
    // configPrices.push(this.fb.group(this.mondayConfigPrice));
    this.form = this.fb.group({
      id: this.object.id,
      basement: this.object.basement,
      configPrices: this.fb.array([
        this.fb.group({
          name: this.object.configPrice[0].name,
          startAt: this.object.configPrice[0].startAt,
          endAt: this.object.configPrice[0].endAt,
          priceByTimes: this.fb.array([
            this.fb.group({
              id: this.object.configPrice[0].priceByTimes[0].id,
              price:this.object.configPrice[0].priceByTimes[0].price,
              type: this.object.configPrice[0].priceByTimes[0].type
            }),this.fb.group({
              id: this.object.configPrice[1].priceByTimes[1].id,
              price:this.object.configPrice[1].priceByTimes[1].price,
              type: this.object.configPrice[1].priceByTimes[1].type
            }),this.fb.group({
              id: this.object.configPrice[2].priceByTimes[2].id,
              price:this.object.configPrice[2].priceByTimes[2].price,
              type: this.object.configPrice[2].priceByTimes[2].type
            }),
          ])
        })
      ])
      // new FormArray([
      //   new FormGroup({
      //   name: new FormControl('Thu 2'),
      //   active: new FormControl(true),
      //   disable: new FormControl(true),
      //   configPrice: new FormArray([
      //     new FormGroup({
      //      id: new FormControl('1'),
      //      startAt: new FormControl(0),
      //      endAt: new FormControl(600),
      //      priceByTimes: new FormArray([
      //       new FormGroup({
      //         id: new FormControl('1'),
      //         price: new FormControl(1000000),
      //         type: new FormControl('NORMAL')
      //       }),
      //       new FormGroup({
      //         id: new FormControl('2'),
      //         price: new FormControl(1200000),
      //         type: new FormControl('VIP')
      //       }),
      //       new FormGroup({
      //         id: new FormControl('3'),
      //         price: new FormControl(1300000),
      //         type: new FormControl('DOUBLE')
      //       })
      //      ]),
      //     })
      //   ])
      // }),
      // new FormGroup({
      //   name: new FormControl('Thu 2'),
      //   active: new FormControl(true),
      //   disable: new FormControl(true),
      //   configPrice: new FormArray([
      //     new FormGroup({
      //      id: new FormControl('1'),
      //      startAt: new FormControl(0),
      //      endAt: new FormControl(600),
      //      priceByTimes: new FormArray([
      //       new FormGroup({
      //         id: new FormControl('1'),
      //         price: new FormControl(1000000),
      //         type: new FormControl('NORMAL')
      //       }),
      //       new FormGroup({
      //         id: new FormControl('2'),
      //         price: new FormControl(1200000),
      //         type: new FormControl('VIP')
      //       }),
      //       new FormGroup({
      //         id: new FormControl('3'),
      //         price: new FormControl(1300000),
      //         type: new FormControl('DOUBLE')
      //       })
      //      ]),
      //     })
      //   ])
      // })
      // ])
    })
  }

  date!: Date;
  ngOnInit(): void {
    this.intitData();
    this.date = new Date();
    this.initForm();
  }
  startTime: Date = new Date();
  endTime: Date = new Date();
  intitData(){
    this.startTime = moment(this.formatNumberToTime(100), TIME_CONSTANT.HH_mm).toDate();
    this.priceByTime.push(new PriceByTime('1',100000,'NORMAL','1'));
    this.priceByTime.push(new PriceByTime('2',150000,'VIP','1'));
    this.priceByTime.push(new PriceByTime('3',175000,'DOUBLE','1'));


    this.mondayConfigPrice.push(new ConfigPrice('1','TICKET',false,0,600,undefined,'ACTIVE',this.priceByTime));
  }

  addToPanel(data: any){
    let priceTmp: PriceByTime[] = [];
    priceTmp.push(new PriceByTime('4',110000,'NORMAL','2'));
    priceTmp.push(new PriceByTime('5', 160000,'VIP','2'));
    priceTmp.push(new PriceByTime('6',185000,'DOUBLE','2'));

    this.getListConfigPrice(data.data).push(new ConfigPrice('1','TICKET',false, 601, 1000,undefined,'ACTIVE',priceTmp));
  }

  deletePriceByTime(data: any, index: number){
    this.getListConfigPrice(data.data).splice(index,1);
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
    console.log(moment(this.formatNumberToTime(config.endAt), TIME_CONSTANT.HH_mm).toDate());
    return  moment(this.formatNumberToTime(config.endAt), TIME_CONSTANT.HH_mm).toDate();
  }

  showModal(panel: any): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
