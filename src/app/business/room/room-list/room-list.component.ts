import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../../shared/model/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../shared/service/room.service';
import { ILocation } from '../../../shared/model/location.model';
import { LocationService } from '../../../shared/service/location.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  roomList: IRoom[] = [];
  locationList: ILocation[] = [];
  searchRequest = {
    keyword: '',
  }

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm(){
    this.searchForm = this.fb.group({
      keyword: '',
      locationIds: []
    })
  }

  loadLocation(data: any){
    this.locationService.autoComplete({keyword: data}).subscribe(response =>{
      this.locationList = response?.data;
    })
  }

}
