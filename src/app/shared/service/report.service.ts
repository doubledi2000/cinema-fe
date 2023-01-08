import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBaseResponse } from '../model/base.model';
import { IOccupancyDetailReportResponse } from '../model/response/occupancy-detail-report.model';
import { IOccupancyReportResponse } from '../model/response/occupancy-report.model';
import { IRevenueReport } from '../model/response/revenue-report.model';
import { RESOURCE } from './../constant/resource.constant';

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

  occupancyReport(data?: any): Observable<IBaseResponse<IOccupancyReportResponse[]>>{
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IOccupancyReportResponse[]>>(`${RESOURCE.URL}/reports/occupancy`, {params});
  }

  occupancyDetail(data?: any): Observable<IBaseResponse<IOccupancyDetailReportResponse[]>> {
    const params = new HttpParams({fromObject: data});
    return this.http.get<IBaseResponse<IOccupancyDetailReportResponse[]>>(`${RESOURCE.URL}/reports/occupancy-detail`, {params});
  }
}

