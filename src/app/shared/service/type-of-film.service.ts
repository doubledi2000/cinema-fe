import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { ITypeOfFilm } from '../model/type-of-film.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOfFilmService {
  url = 'http://localhost:8070/api'

  constructor(private httpClient: HttpClient) { }

  search(data: any): Observable<IBaseResponse<ITypeOfFilm[]>>{
    const params = new HttpParams({fromObject: data});
    return this.httpClient.get<IBaseResponse<ITypeOfFilm[]>>(`${this.url}/type-of-films`, {params})
  }

  getById(id: string):Observable<IBaseResponse<ITypeOfFilm>>{
    return this.httpClient.get<IBaseResponse<ITypeOfFilm>>(`${this.url}/type-of-films/${id}`)
  }

  update(id: string, body: any): Observable<IBaseResponse<ITypeOfFilm>> {
    return this.httpClient.post(`${this.url}type-of-films/:${id}/updates`, body);
  }

  create(body: any): Observable<IBaseResponse<ITypeOfFilm>>{
    return this.httpClient.post(`${this.url}/type-of-films`, body);
  }
}
