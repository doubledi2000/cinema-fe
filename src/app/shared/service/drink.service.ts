import { RESOURCE } from './../constant/resource.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseResponse } from '../model/base.model';
import { IDrink } from '../model/drinks.model';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<IBaseResponse<IDrink>> {
    return this.http.post<IBaseResponse<IDrink>>(`${RESOURCE.URL}/drinks`, data);
  }

  update(id: string, data?: any): Observable<IBaseResponse<IDrink>> {
    return this.http.post<IBaseResponse<IDrink>>(`${RESOURCE.URL}/drinks/${id}/update`, data);
  }

  getById(id: string): Observable<IBaseResponse<IDrink>> {
    return this.http.get<IBaseResponse<IDrink>> (`${RESOURCE.URL}/drinks/${id}`);
  }

  active(id?: string): Observable<IBaseResponse<boolean>> {
    return this.http.post<IBaseResponse<boolean>> (`${RESOURCE.URL}/drinks/${id}/active`,{});
  }

  inactive(id?: string): Observable<IBaseResponse<boolean>> {
    return this.http.post<IBaseResponse<boolean>> (`${RESOURCE.URL}/drinks/${id}/inactive`,{});
  }

  search(param?: any): Observable<IBaseResponse<IDrink[]>> {
    const params = new HttpParams({fromObject:param});
    return this.http.get<IBaseResponse<IDrink[]>>(`${RESOURCE.URL}/drinks`, {params});
  }
}
