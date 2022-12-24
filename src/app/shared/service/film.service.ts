import { RESOURCE } from './../constant/resource.constant';
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
  const params = new HttpParams({fromObject: data})
    return this.http.get<IBaseResponse<IFilm[]>>(`${this.url}/films`, {params});
  }

    create(data: any): Observable<IBaseResponse<IFilm>> {
    return this.http.post<IBaseResponse<IFilm>>(`${RESOURCE.URL}/films`, data);
  }

  update(id: string, data: any): Observable<IBaseResponse<IFilm>> {
    return this.http.post<IBaseResponse<IFilm>>(`${RESOURCE.URL}/films/${id}/update`, data);
  }


  autoComplete(data: any): Observable<IBaseResponse<IFilm[]>>{
    const params = new HttpParams({fromObject: data})
      return this.http.get<IBaseResponse<IFilm[]>>(`${this.url}/films/auto-complete`, {params});
    }
}
