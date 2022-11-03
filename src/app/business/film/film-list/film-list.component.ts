import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITypeOfFilm } from '../../../shared/model/type-of-film.model';
import { FilmService } from '../../../shared/service/film.service';
import { TypeOfFilmService } from '../../../shared/service/type-of-film.service';
import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { IFilm } from '../../../shared/model/film.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  typeOfFilmList: ITypeOfFilm[] = [];
  filmList: IFilm[] = [];
  total = 0;
  searchForm:FormGroup = new FormGroup({});
  searchRequest = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    locationIds: [],
    producerIds: [],
  }

  constructor(
    private fb: FormBuilder,
    private typeOfFilmService: TypeOfFilmService,
    private filmService: FilmService,
    private router: Router,
    ) {}

  public ngOnInit() {
    this.initForm();
    this.search();
    this.loadTypeOfFilm();
  }

  initForm(){
    this.searchForm = this.fb.group({
      keyword: '',
      locationIds: [],
      producerIds: []
    })
  }

  loadTypeOfFilm(){
    const param = {
      keyword: ''
    }
    this.typeOfFilmService.autoComplete(param).subscribe(res => {
      if(res.success) {
        this.typeOfFilmList = res?.data;
      }
    })
  }

  search(){
    this.searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    const param = {
      ...this.searchRequest,
      locationIds: this.searchRequest.locationIds ? this.searchRequest.locationIds : [],
      producerIds: this.searchRequest.producerIds ? this.searchRequest.producerIds : []
    }

    this.filmService.search(param).subscribe(response=>{
      if(response.success) {
        this.filmList = response?.data;
        this.total = response.page.total | 0
      }
    })
  }

  create(){
    this.router.navigateByUrl('/business/film/create');
  }

  update(item: IFilm){
    this.router.navigateByUrl(`/business/film/${item.id}/update`)
  }

  view(item: IFilm) {
    this.router.navigateByUrl(`/business/film/${item.id}/detail`)
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.search();
  }
}
