import { Component, OnInit } from '@angular/core';
import { IProducer } from '../../../shared/model/producer.model';
import { IBaseRequestModel } from '../../../shared/model/request/base-request.model';
import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProducerService } from '../../../shared/service/producer.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import CommonUtil from '../../../shared/utils/common-util';
import { ProducerUpdateComponent } from '../producer-update/producer-update.component';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit {

  producerList: IProducer[] = [];
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
    private producerService: ProducerService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.search();
  }

  initSearchForm() {
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

  search(){
    const searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    this.producerService.search(searchRequest).subscribe(response=>{
      this.producerList = response?.data as IProducer[];
      this.total = response?.page.total || 0
    })
  }

  create(){
    const base = CommonUtil.modalBase(
      ProducerUpdateComponent,
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

  update(producer: IProducer){
    const base = CommonUtil.modalBase(
      ProducerUpdateComponent,
      {
        isUpdate: true,
        producer,
      },
      '40%%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        this.ngOnInit();
      }
    })
  }

  view(producer: IProducer){
    const base = CommonUtil.modalBase(
      ProducerUpdateComponent,
      {
        isDetail: true,
        producer,
      },
      '40%'
    )
    this.modalService.create(base);
  }

  delete(producer: IProducer){

  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.search();
  }
}
