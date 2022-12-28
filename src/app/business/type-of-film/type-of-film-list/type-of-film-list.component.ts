import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PAGINATION } from 'src/app/shared/constant/pagination.constant';
import { IBaseRequestModel } from 'src/app/shared/model/request/base-request.model';
import { ITypeOfFilm } from 'src/app/shared/model/type-of-film.model';
import { TypeOfFilmService } from 'src/app/shared/service/type-of-film.service';
import CommonUtil from 'src/app/shared/utils/common-util';
import { TypeOfFilmDetailComponent } from '../type-of-film-detail/type-of-film-detail.component';
import { RULE } from '../../../shared/constant/authority.constant';
@Component({
  selector: 'app-type-of-film-list',
  templateUrl: './type-of-film-list.component.html',
  styleUrls: ['./type-of-film-list.component.scss']
})
export class TypeOfFilmListComponent implements OnInit {

  typeOfFilmList: ITypeOfFilm[] = [];
  total = 0;
  searchRequest: IBaseRequestModel = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    sortBy: '',
  }
  RULE = RULE;

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private typeOfFilmService: TypeOfFilmService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.search();
  }


  loadData(){
    const params = {
      pageIndex: 1
    }
    this.typeOfFilmService.search(params).subscribe(response=> {
      this.typeOfFilmList = response.data as ITypeOfFilm[];
    })
  }

  create(){
    const base = CommonUtil.modalBase(
      TypeOfFilmDetailComponent,
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

  update(typeOfFilm: ITypeOfFilm){
    const base = CommonUtil.modalBase(
      TypeOfFilmDetailComponent,
      {
        isUpdate: true,
        typeOfFilm,
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

  toggleActive(item: any){
    if(item.status == 'ACTIVE') {
      this.typeOfFilmService.inactive(item.id).subscribe(res =>{
        if(res && res.success) {
          item.status = 'INACTIVE';
        }
      })
    } else {
      this.typeOfFilmService.active(item.id).subscribe(res =>{
        if(res && res.success) {
          item.status = 'ACTIVE';
        }
      })
    }
  }

  view(typeOfFilm: ITypeOfFilm){
    const base = CommonUtil.modalBase(
      TypeOfFilmDetailComponent,
      {
        isDetail: true,
        typeOfFilm,
      },
      '40%'
    )
    this.modalService.create(base);
  }

  delete(typeOfFilm: ITypeOfFilm){

  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.searchRequest.pageIndex,
      this.searchRequest.pageSize
    );
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      keyword: ''
    })
  }

  search(){
    const searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    this.typeOfFilmService.search(searchRequest).subscribe(response=>{
      this.typeOfFilmList = response?.data as ITypeOfFilm[];
      this.total = response?.page.total || 0
    })
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.ngOnInit();
  }
}
