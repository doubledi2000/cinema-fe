import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../../shared/model/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../shared/service/room.service';
import { ILocation } from '../../../shared/model/location.model';
import { LocationService } from '../../../shared/service/location.service';
import { PAGINATION } from '../../../shared/constant/pagination.constant';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  roomList: IRoom[] = [];
  locationList: ILocation[] = [];
  total = 0;
  searchRequest = {
    keyword: '',
    locationIds: [],
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,

  }

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.search();
  }

  initForm(){
    this.searchForm = this.fb.group({
      keyword: '',
      locationIds: new Array
    })
  }

  loadLocation(data: any){
    this.locationService.autoComplete({keyword: data}).subscribe(response =>{
      this.locationList = response?.data;
    })
  }

  search(){
    this.searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value,
    }
    this.searchRequest = {
      ...this.searchRequest,
      locationIds: this.searchRequest.locationIds ? this.searchRequest.locationIds : []
    }
    this.roomService.search(this.searchRequest).subscribe(res =>{
      if(res.success) {
        this.roomList = res.data as IRoom[];
        this.total = res.page.total;
      }
    })
  }

  view(data: any) {
    this.router.navigateByUrl(`/business/rooms/${data.id}/detail`);
  }

  update(data: any) {
    this.router.navigateByUrl(`/business/rooms/${data.id}/update`);
  }

  delete(data: any) {

  }

  create(){
    this.router.navigateByUrl(`/business/rooms/create`);
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.search()
  }
}
