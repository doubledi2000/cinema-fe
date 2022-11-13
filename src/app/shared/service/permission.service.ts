import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IPermission } from '../model/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  findAll():Observable<IBaseResponse<IPermission[]>>{
    return this.http.get<IBaseResponse<IPermission[]>>(`${RESOURCE.URL}/permissions/find-all`);
  }

}
