import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILocation } from '../../../shared/model/location.model';
import { IBaseRequestModel } from '../../../shared/model/request/base-request.model';
import { PAGINATION } from '../../../shared/constant/pagination.constant';
import CommonUtil from '../../../shared/utils/common-util';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LocationService } from '../../../shared/service/location.service';
import { STATUS } from '../../../shared/constant/status.constant';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});
  total = 0;
  searchRequest: IBaseRequestModel = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    sortBy: '',
  }
  locationList: ILocation[] = [];

  constructor(private fb: FormBuilder,
    private modalService: NzModalService,
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.search();
  }

  initSearchForm(){
    this.searchForm = this.fb.group({
      keyword: ''
    })
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.searchRequest.pageIndex,
      this.searchRequest.pageSize
    );
  }

  create(){
    const base = CommonUtil.modalBase(
      LocationDetailComponent,
      {
        isCreate: true,
      },
      '40%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        this.ngOnInit();
      }
    })
  }

  view(location: ILocation){
    const base = CommonUtil.modalBase(
      LocationDetailComponent,
      {
        isDetail: true,
        location
      },
      '40%'
    )
    this.modalService.create(base);
  }

  update(location: ILocation){
    const base = CommonUtil.modalBase(
      LocationDetailComponent,
      {
        isUpdate: true,
        location
      },
      '40%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        this.ngOnInit();
      }
    })
  }

  delete(location: ILocation){

  }
  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.ngOnInit();
  }

  search(){
    this.searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    this.locationService.search(this.searchRequest).subscribe(response=>{
      if(response && response.code == STATUS.SUCCESS_200) {
        this.locationList = response.data as ILocation[];
        this.total = response?.page.total || 0;
      }
    })
  }
}
