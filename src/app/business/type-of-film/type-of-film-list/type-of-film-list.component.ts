import { Component, OnInit } from '@angular/core';
import { ITypeOfFilm } from 'src/app/shared/model/type-of-film.model';
import { TypeOfFilmService } from 'src/app/shared/service/type-of-film.service';

@Component({
  selector: 'app-type-of-film-list',
  templateUrl: './type-of-film-list.component.html',
  styleUrls: ['./type-of-film-list.component.scss']
})
export class TypeOfFilmListComponent implements OnInit {

  typeOfFilmList: ITypeOfFilm[] = []

  constructor(
    private typeOfFilmService: TypeOfFilmService
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
}
