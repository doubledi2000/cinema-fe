import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { RoleService } from '../../../shared/service/role.service';
import { IRole } from '../../../shared/model/role.model';
import CommonUtil from '../../../shared/utils/common-util';
import { UpdateRoleComponent } from './update-role/update-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleList: IRole[] = [];
  searchForm: FormGroup = new FormGroup({});
  total = 0;
  searchRequest = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    sortBy: '',
  }

  constructor(
    private modalService: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private roleService: RoleService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.search();
  }

  initSearchForm(){
    this.searchForm = this.fb.group({
      keyword: ['']
    })
  }

  search(){
    const searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }

    this.roleService.search(searchRequest).subscribe(resposne => {
      if(resposne && resposne.success) {
        this.roleList = resposne.data as IRole[];
      }
    })
  }

  create(){
    const base = CommonUtil.modalBase(
      UpdateRoleComponent,
      {
        isCreate: true
      },
      '40%'
    )
    const modal = this.modalService.create(base);
    modal.afterClose.subscribe(result => {
      if(result && result.success) {
        this.search();
      }
    })
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.searchRequest.pageIndex,
      this.searchRequest.pageSize
    );
  }

  updatePermission(item: any){

  }

  update(item: any){

  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.ngOnInit();
  }

}
