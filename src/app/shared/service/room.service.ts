import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IRoom } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }

  search(data?: any): Observable<IBaseResponse<IRoom[]>>{
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IRoom[]>>(`${RESOURCE.URL}/rooms`, {params});
  }

  create(data?: any): Observable<IBaseResponse<IRoom>>{
    return this.http.post<IBaseResponse<IRoom>>(`${RESOURCE.URL}/rooms`, data);
  }

  update(id?: string, data?: any): Observable<IBaseResponse<IRoom>>{
    return this.http.post<IBaseResponse<IRoom>>(`${RESOURCE.URL}/rooms/${id}/update`, data);
  }

  getById(id?: string): Observable<IBaseResponse<IRoom>>{
    return this.http.get<IBaseResponse<IRoom>>(`${RESOURCE.URL}/rooms/${id}`);
  }

  autoComplete(data?: any): Observable<IBaseResponse<IRoom[]>>{
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IRoom[]>>(`${RESOURCE.URL}/rooms/auto-complete`, {params});
  }
}
