import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFile } from '../model/file.model';
import { IBaseResponse } from '../model/base.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient
  ) { }

  upload(data: any): Observable<IBaseResponse<IFile>> {
    return this.http.post<IBaseResponse<IFile>>(`${RESOURCE.URL}/files`, data);
  }
}
