import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IFilm } from '../model/film.model';
import { IBaseRequestModel, ISearchWithPagination } from '../model/request/base-request.model';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url = 'http://localhost:8070/api';

  constructor(
    private http: HttpClient
  ) { }

  getById(id: string): Observable<IBaseResponse<IFilm>>{
    return this.http.get<IBaseResponse<IFilm>>(`${this.url}/films/${id}`);
  }

  search(data: any): Observable<IBaseResponse<IFilm[]>>{
  const body = new HttpParams({fromObject: data})
    return this.http.get<IBaseResponse<IFilm[]>>(`${this.url}/type-of-films`, {params: body});
  }
// 
  // create(data: any)
}
