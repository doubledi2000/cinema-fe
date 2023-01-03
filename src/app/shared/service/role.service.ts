import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBaseResponse } from '../model/base.model';
import { IRole } from '../model/role.model';
import { RESOURCE } from './../constant/resource.constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  search(data: any): Observable<IBaseResponse<IRole[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IRole[]>>(`${RESOURCE.URL}/roles`, {params});
  }

  create(data: any): Observable<IBaseResponse<IRole>>{
    return this.http.post<IBaseResponse<IRole>>(`${RESOURCE.URL}/roles`,data);
  }

  update(id: string, data: any): Observable<IBaseResponse<IRole>>{
    return this.http.post<IBaseResponse<IRole>>(`${RESOURCE.URL}/roles/${id}/update`, data);
  }

  getById(id: string): Observable<IBaseResponse<IRole>>{
    return this.http.get<IBaseResponse<IRole>>(`${RESOURCE.URL}/roles/${id}`);
  }

  autoComplete(data: any): Observable<IBaseResponse<IRole[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IRole[]>>(`${RESOURCE.URL}/roles/auto-complete`, {params});
  }

  permission(id?: string, data?: any): Observable<IBaseResponse<boolean>> {
    return this.http.post<IBaseResponse<boolean>>(`${RESOURCE.URL}/roles/${id}/permit`, data);
  }

  findByIds(data?: any): Observable<IBaseResponse<IRole[]>>{
    return this.http.post<IBaseResponse<IRole[]>>(`${RESOURCE.URL}/roles/find-by-ids`, data);
  }
}
