import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { Showtime, IShowtime } from '../model/showtime.model';
import { IShowtimeByFilm } from '../model/response/IShowtimeByFilm.model';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  constructor(
    private http: HttpClient
  ) { }

  search(data?: any): Observable<IBaseResponse<IShowtimeByFilm[]>>{
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IShowtimeByFilm[]>>(`${RESOURCE.URL}/showtimes`, {params});
  }

  create(data?: any): Observable<IBaseResponse<IShowtime>> {
    return this.http.post<IBaseResponse<IShowtime>>(`${RESOURCE.URL}/showtimes`, data);
  }

  findById(id?:string): Observable<IBaseResponse<IShowtime>>{
    return this.http.get<IBaseResponse<IShowtime>>(`${RESOURCE.URL}/showtimes/${id}`, );
  }

  searchConfig(data?: any): Observable<IBaseResponse<IShowtime[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IShowtime[]>>(`${RESOURCE.URL}/showtimes/config`, {params});
  }
}
