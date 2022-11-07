import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IProducer } from '../model/producer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private http: HttpClient) { }

  search(data: any): Observable<IBaseResponse<IProducer[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IProducer[]>>(`${RESOURCE.URL}/producers`, {params});
  }

  create(data: any): Observable<IBaseResponse<IProducer>>{
    return this.http.post<IBaseResponse<IProducer>>(`${RESOURCE.URL}/producers`,data);
  }

  update(id: string, data: any): Observable<IBaseResponse<IProducer>>{
    return this.http.post<IBaseResponse<IProducer>>(`${RESOURCE.URL}/producers/${id}/update`, data);
  }

  getById(id: string): Observable<IBaseResponse<IProducer>>{
    return this.http.get<IBaseResponse<IProducer>>(`${RESOURCE.URL}/producers/${id}`);
  }

  autoComplete(data: any): Observable<IBaseResponse<IProducer[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IProducer[]>>(`${RESOURCE.URL}/producers/auto-complete`, {params});
  }
}
