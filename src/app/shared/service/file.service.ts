import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IFile } from '../model/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private client: HttpClient) { }

  upload(file:any): Observable<IBaseResponse<IFile>> {
    const formData = new FormData();
    formData.append("file", file);
    return this.client.post(`${RESOURCE.URL}/files`, formData);
  }
}
