import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { ILocation } from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  search(data: any): Observable<IBaseResponse<ILocation[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<ILocation[]>>(`${RESOURCE.URL}/locations`, {params});
  }

  create(data: any): Observable<IBaseResponse<ILocation>>{
    return this.http.post<IBaseResponse<ILocation>>(`${RESOURCE.URL}/locations`,data);
  }

  update(id: string, data: any): Observable<IBaseResponse<ILocation>>{
    return this.http.post<IBaseResponse<ILocation>>(`${RESOURCE.URL}/locations/${id}/update`, data);
  }

  getById(id: string): Observable<IBaseResponse<ILocation>>{
    return this.http.get<IBaseResponse<ILocation>>(`${RESOURCE.URL}/locations/${id}`);
  }

  autoComplete(data: any): Observable<IBaseResponse<ILocation[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<ILocation[]>>(`${RESOURCE.URL}/locations/auto-complete`, {params});
  }
}
