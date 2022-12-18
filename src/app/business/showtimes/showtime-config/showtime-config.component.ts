import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShowtimeService } from '../../../shared/service/showtime.service';
import { LocationService } from '../../../shared/service/location.service';
import { RoomService } from '../../../shared/service/room.service';
import { ILocation } from '../../../shared/model/location.model';
import { IShowtime } from '../../../shared/model/showtime.model';
import { IRoom } from '../../../shared/model/room.model';
import { IBaseRequestModel } from '../../../shared/model/request/base-request.model';
import { PAGINATION } from '../../../shared/constant/pagination.constant';
import CommonUtil from '../../../shared/utils/common-util';

@Component({
  selector: 'app-showtime-config',
  templateUrl: './showtime-config.component.html',
  styleUrls: ['./showtime-config.component.scss']
})
export class ShowtimeConfigComponent implements OnInit {

  locationList: ILocation[] = [];
  showtimeList: IShowtime[] = [];
  roomList: IRoom[] = [];
  searchForm: FormGroup = new FormGroup({});
  total = 0;
  searchRequest: IBaseRequestModel = {
    keyword: '',
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
    sortBy: '',
  }
  constructor(
    private fb: FormBuilder,
    private showtimeService: ShowtimeService,
    private locationService: LocationService,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadLocation();
  }

  initForm(){
    this.searchForm = this.fb.group({
      keyword: [''],
      locationIds: [[]],
      roomIds: [[]],
      statuses: [[]]
    })
    this.search();
  }

  loadLocation(){
    this.locationService.autoComplete({}).subscribe(response => {
      if (response && response.success) {
        this.locationList = response?.data as ILocation[];
      }
    })
  }

  loadRoom(){
    const params = {
      ...this.searchForm.value
    }
    if(params.locationIds.length > 0) {
      this.roomService.autoComplete({locationIds:params.locationIds}).subscribe(res => {
        this.roomList = res?.data as IRoom[];
      })
    }
  }

  search(){
    const searchRequest = {
      ...this.searchForm.value,
      ...this.searchRequest
    }
    debugger
    this.showtimeService.searchConfig(searchRequest).subscribe(res => {
      if(res && res.success) {
        this.showtimeList = res.data as IShowtime[];
        this.total = res.page.total;
      }
    })
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.searchRequest.pageIndex,
      this.searchRequest.pageSize
    );
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.search();
  }
}
