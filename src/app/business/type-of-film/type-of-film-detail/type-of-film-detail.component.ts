import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITypeOfFilm, TypeOfFilm } from 'src/app/shared/model/type-of-film.model';
import { TypeOfFilmService } from 'src/app/shared/service/type-of-film.service';

@Component({
  selector: 'app-type-of-film-detail',
  templateUrl: './type-of-film-detail.component.html',
  styleUrls: ['./type-of-film-detail.component.scss']
})
export class TypeOfFilmDetailComponent implements OnInit {
  isDetail = window.location.href.includes('detail');
  isUpdate = window.location.href.includes('update');
  isCreate = window.location.href.includes('create');
  typeOfFilmDetail :ITypeOfFilm = new TypeOfFilm();
  typeOfFilmId = '';
  isEdit = false;

  constructor(
    private typeOfFilmService: TypeOfFilmService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  getUrlParam(){
    this.activatedRoute.params.subscribe((params) => {
      if (params?.id) {
        this.typeOfFilmId = params.id;
        this.isEdit = true;
        this.getTypeOfFilmById(this.typeOfFilmId || '');
      }
    });
  }

  getTypeOfFilmById(id: string){
    this.typeOfFilmService.getById(id).subscribe(response=>{
      this.typeOfFilmDetail = response?.data as ITypeOfFilm;
    } )
  }
}
