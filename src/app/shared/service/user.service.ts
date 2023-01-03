import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IUser } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  search(data: any): Observable<IBaseResponse<IUser[]>>{
    const params = new HttpParams({fromObject: data});
    return this.httpClient.get<IBaseResponse<IUser[]>>(`${RESOURCE.URL}/users`, {params})
  }

  getById(id: string):Observable<IBaseResponse<IUser>>{
    return this.httpClient.get<IBaseResponse<IUser>>(`${RESOURCE.URL}/users/${id}`)
  }

  update(id: string, body: any): Observable<IBaseResponse<IUser>> {
    return this.httpClient.post(`${RESOURCE.URL}/users/${id}/update`, body);
  }

  create(body: any): Observable<IBaseResponse<IUser>>{
    return this.httpClient.post(`${RESOURCE.URL}/users`, body);
  }

  autoComplete(data: any): Observable<IBaseResponse<IUser[]>>{
    const params = new HttpParams({fromObject: data});
    return this.httpClient.get<IBaseResponse<IUser[]>>(`${RESOURCE.URL}/users/auto-complete`, {params})
  }

  myProfile(): Observable<IBaseResponse<IUser>> {
    return this.httpClient.get<IBaseResponse<IUser>>(`${RESOURCE.URL}/me/my-profile`)
  }

  updateProfile(data?: any): Observable<IBaseResponse<boolean>> {
    return this.httpClient.post<IBaseResponse<boolean>>(`${RESOURCE.URL}/me/update`, data);
  }

  changePassword(data?: any): Observable<IBaseResponse<boolean>> {
    return this.httpClient.post<IBaseResponse<boolean>>(`${RESOURCE.URL}/me/change-password`, data);
  }
}
