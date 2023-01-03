import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import {
  TIME_CONSTANT,
} from 'src/app/shared/constant/date.constant';
import { ConfigPrice } from 'src/app/shared/model/config-price.model';
import { PriceByTime } from 'src/app/shared/model/price-by-time.model';
import CommonUtil from '../../../shared/utils/common-util';
import { AddPriceModalComponent } from './add-price-modal/add-price-modal.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { ILocation } from '../../../shared/model/location.model';
import { LocationService } from '../../../shared/service/location.service';
import { ILocationPriceConfig, LocationPriceConfig } from '../../../shared/model/response/location-price-config.model';
import { TICKET } from '../../../shared/constant/common.constant';

@Component({
  selector: 'app-ticket-price',
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.scss'],
})
export class TicketPriceComponent implements OnInit {
  locationList: ILocation[] = [];
  locationId: string = '';
  priceByTime: PriceByTime[] = [];
  locationPriceConfig: ILocationPriceConfig = new LocationPriceConfig();
  ticketLabel = TICKET;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private toastr: ToastrService,
    private locationService: LocationService
  ) {}

  initFormNotValue(){
    this.form = this.fb.group({
      id: '',
      configPrices: this.fb.array([])
    })
  }

  initForm() {
    let configPriceArr: FormArray = new FormArray([])
    this.locationPriceConfig.priceConfigs.forEach(element =>{
      let priceByTimeArr: FormArray = new FormArray([]);

      element.priceByTimes.forEach(priceByTime =>{
        let priceArr: FormArray = new FormArray([]);

        priceByTime.prices.forEach(price => {
          const priceTmp = this.fb.group({
            id: price.id,
            chairType: price.chairType,
            price: price.price,
            priceByTimeId: price.priceByTimeId
          })
          priceArr.push(priceTmp)
        })
        const priceByTimeTmp = this.fb.group({
          id: priceByTime.id,
          startAt: priceByTime.startAt,
          endAt: priceByTime.endAt,
          priceConfigId: priceByTime.priceConfigId,
          prices: priceArr,
        })

        priceByTimeArr.push(priceByTimeTmp);
      })
      const formTmp = this.fb.group({
        id: element.id,
        dayOfWeek: element.dayOfWeek,
        locationId: element.locationId,
        priceByTimes: priceByTimeArr
      })
      configPriceArr.push(formTmp);
    })

    this.form = this.fb.group({
      id: this.locationId,
      configPrices: configPriceArr,
    });
  }

  date!: Date;
  ngOnInit(): void {
    this.initFormNotValue();
    this.loadLocationService();
  }
  startTime: Date = new Date();
  endTime: Date = new Date();
  loadLocationService(){
    this.locationService.autoComplete({}).subscribe(response =>{
      if(response && response.success){
        this.locationList = response.data as ILocation[];
        this.locationId = this.locationList[0].id
        this.getLocationPriceConfig();
      }
    })
  }

  getLocationPriceConfig(){
    this.locationService.getPriceConfigNormal(this.locationId)
    .subscribe((response) =>{
      if(response && response.success) {
        this.locationPriceConfig = response.data as ILocationPriceConfig
        this.initForm();
      }
    })
  }
  deletePriceByTime(data: any, index: number) {
    console.log(data)
    data.get('priceByTimes').removeAt(index);
  }

  showModal(panel: any): void {
    const base = CommonUtil.modalBase(AddPriceModalComponent, {}, '50%');
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        const startAt = CommonUtil.getTime(result.value.startTime);
        const endAt = CommonUtil.getTime(result.value.endTime);
        let startIndex = 0;
        let endIndex = 0;
        let startElement;
        let endElement;
        if (startAt < endAt) {
          panel['controls'].forEach((element, index) => {
            if (
              element.get('startAt').value <= startAt &&
              element.get('endAt').value >= startAt
            ) {
              startIndex = index;
              startElement = element;
            }
            if (
              element.get('startAt').value <= endAt &&
              element.get('endAt').value >= endAt
            ) {
              endIndex = index;
              endElement = element;
            }
          });

          if (panel.length == 0) {
            panel.push(
              this.fb.group({
                id: '',
                startAt,
                endAt,
                special: false,
                prices: this.fb.array([
                  this.fb.group({
                    chairType: ['NORMAL'],
                    price: [1000000],
                  }),
                  this.fb.group({
                    chairType: ['VIP'],
                    price: [1000000],
                  }),
                  this.fb.group({
                    chairType: ['SWEET'],
                    price: [1000000],
                  }),
                ]),
              })
            );
          } else {
            for(let i = startIndex; i <= endIndex;i++){
              panel.removeAt(startIndex);
            }
            if(startAt != startElement.get('startAt').value) {
              panel.insert(
                startIndex++,
                this.fb.group({
                  id: '',
                  startAt: startElement.get('startAt').value,
                  endAt: startAt - 1,
                  special: false,
                  prices: this.fb.array([
                    this.fb.group({
                      chairType: ['NORMAL'],
                      price: startElement.get('prices')['controls'][0].get('price').value,
                    }),
                    this.fb.group({
                      chairType: ['VIP'],
                      price: startElement.get('prices')['controls'][1].get('price').value,
                    }),
                    this.fb.group({
                      chairType: ['SWEET'],
                      price: startElement.get('prices')['controls'][2].get('price').value,
                    }),
                  ]),
                })
              );
            }
            panel.insert(
              startIndex++,
              this.fb.group({
                id: '',
                startAt,
                endAt,
                special: false,
                prices: this.fb.array([
                  this.fb.group({
                    chairType: ['NORMAL'],
                    price: result.value.prices.normalSeat,
                  }),
                  this.fb.group({
                    chairType: ['VIP'],
                    price: result.value.prices.vipSeat,
                  }),
                  this.fb.group({
                    chairType: ['SWEET'],
                    price: result.value.prices.sweetSeat,
                  }),
                ]),
              })
            );
            if(endAt != endElement.get('endAt').value) {
              panel.insert(
                startIndex++,
                this.fb.group({
                  id: '',
                  startAt: endAt + 1,
                  special: false,
                  endAt: endElement.get('endAt').value,
                  prices: this.fb.array([
                    this.fb.group({
                      chairType: ['NORMAL'],
                      price: endElement.get('prices')['controls'][0].get('price').value,
                    }),
                    this.fb.group({
                      chairType: ['VIP'],
                      price: endElement.get('prices')['controls'][1].get('price').value,
                    }),
                    this.fb.group({
                      chairType: ['SWEET'],
                      price: endElement.get('prices')['controls'][2].get('price').value,
                    }),
                  ]),
                })
              );
            }
          }
        } else {
          this.toastr.error(
            'Thời gian kết thúc phải lơn hơn thời gian bắt đầu'
          );
        }
      }
    });
  }

  update(){
    this.locationService.updateNormalTicketPrice(this.form.value).subscribe(response => {
      if(response && response.success) {
        this.toastr.success('Cập nhật giá vé thành công');
      }else{
        this.toastr.error('Cập nhật giá vé thất bại');
      }
    })
  }

  changeLocation(){
    this.getLocationPriceConfig();
  }

  printTime(data: any) {
    return (
      CommonUtil.printTime(data.startAt) +
      '-' +
      CommonUtil.printTime(data.endAt)
    );
  }

  getDayName(i: number){
    return CommonUtil.days[i];
  }
}
