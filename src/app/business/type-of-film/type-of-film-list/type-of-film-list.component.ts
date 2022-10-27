import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ITypeOfFilm } from 'src/app/shared/model/type-of-film.model';
import { TypeOfFilmService } from 'src/app/shared/service/type-of-film.service';
import CommonUtil from 'src/app/shared/utils/common-util';
import { TypeOfFilmDetailComponent } from '../type-of-film-detail/type-of-film-detail.component';
@Component({
  selector: 'app-type-of-film-list',
  templateUrl: './type-of-film-list.component.html',
  styleUrls: ['./type-of-film-list.component.scss']
})
export class TypeOfFilmListComponent implements OnInit {

  typeOfFilmList: ITypeOfFilm[] = []

  constructor(
    private typeOfFilmService: TypeOfFilmService,
    private modalRef: NzModalRef,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.loadData();
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
        isUpdate: true,
      },
      '80%'
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
      '80%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        this.ngOnInit();
      }
    })
  }

  view(typeOfFilm: ITypeOfFilm){
    const base = CommonUtil.modalBase(
      TypeOfFilmDetailComponent,
      {
        isDetail: true,
        typeOfFilm,
      },
      '80%'
    )
    const modal: NzModalRef = this.modalService.create(base);
  }

  delete(typeOfFilm: ITypeOfFilm){

  }
}
