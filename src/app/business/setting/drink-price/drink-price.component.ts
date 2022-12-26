import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { IDrink } from '../../../shared/model/drinks.model';
import { ILocation } from '../../../shared/model/location.model';
import { IBaseRequestModel } from '../../../shared/model/request/base-request.model';
import { DrinkService } from '../../../shared/service/drink.service';
import { LocationService } from '../../../shared/service/location.service';
import CommonUtil from '../../../shared/utils/common-util';
import { Router } from '@angular/router';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-drink-price',
  templateUrl: './drink-price.component.html',
  styleUrls: ['./drink-price.component.scss']
})
export class DrinkPriceComponent implements OnInit {

  dinkList: IDrink[] = [];
  locationList: ILocation[] = [];
  locationId?: string;
  total = 0;
  searchRequest: IBaseRequestModel = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    sortBy: '',
  }
  searchForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private drinkService: DrinkService,
    private locationService: LocationService,
    private router: Router,
    private modalService: NzModalService
    ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.search();
  }

  loadLocation(keyword: string){
    this.locationService.autoComplete({keyword: keyword.trim()}).subscribe(res =>{
      if(res && res.success) {
        this.locationList = res.data as ILocation[];
      }
    })
  }

  // loadData(){
  //   const params = {
  //     ...this.searchRequest,
  //     ...this.searchForm
  //   }
  //   this.drinkService.search(params).subscribe(response=> {
  //     this.dinkList = response.data as IDrink[];
  //   })
  // }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.searchRequest.pageIndex,
      this.searchRequest.pageSize
    );
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: '',
      locationIds: [[]]
    })
  }

  search(){
    const searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    this.drinkService.search(searchRequest).subscribe(response=>{
      this.dinkList = response?.data as IDrink[];
      this.total = response?.page.total || 0
    })
  }

  create(){
    const base = CommonUtil.modalBase(
      DrinkDetailComponent,
      {
        isCreate: true
      },
      '80%'
    );
    const modal:NzModalRef = this.modalService.create(base);

    modal.afterClose.subscribe(res => {
      if(res && res.success) {
        this.search();
      }
    })
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.search();
  }

  view(drink: IDrink){
    const base = CommonUtil.modalBase(
      DrinkDetailComponent,
      {
        isDetail: true,
        drink,
      },
      '70%'
    )
    this.modalService.create(base);
  }

  toggleActive(item: any){
    if(item.status == 'ACTIVE') {
      this.drinkService.inactive(item.id).subscribe(res =>{
        if(res && res.success) {
          item.status = 'INACTIVE';
        }
      })
    } else {
      this.drinkService.active(item.id).subscribe(res =>{
        if(res && res.success) {
          item.status = 'ACTIVE';
        }
      })
    }
  }
}
