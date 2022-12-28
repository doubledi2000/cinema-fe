import { RESOURCE } from './../constant/resource.constant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBaseResponse } from '../model/base.model';
import { IRevenueReport } from '../model/response/revenue-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  revenueReport(data?:any): Observable<IBaseResponse<IRevenueReport[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IRevenueReport[]>>(`${RESOURCE.URL}/reports/revenue`, {params});
  }
}
