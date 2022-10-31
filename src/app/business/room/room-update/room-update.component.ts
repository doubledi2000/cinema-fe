import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../shared/service/location.service';
import { RoomService } from '../../../shared/service/room.service';
import { ILocation, Location } from '../../../shared/model/location.model';
import { Room, IRoom } from '../../../shared/model/room.model';
import CommonUtil from '../../../shared/utils/common-util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.scss']
})
export class RoomUpdateComponent implements OnInit {

  isDetail = window.location.href.includes('detail');
  isUpdate = window.location.href.includes('update');
  isCreate = window.location.href.includes('create');
  locationList:ILocation[] = [];
  location?: ILocation = new Location();
  room?: IRoom = new Room();
  roomId?: string;

  form: FormGroup = new FormGroup({});
  constructor(private modalService: NzModalService,
      private locationService: LocationService,
      private roomService: RoomService,
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {

     }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      this.roomId = res.get('id') || '';
      if(this.roomId) {
        this.findRoomById(this.roomId);
      }
    })
    this.initForm();
  }

  openRoomSetting() {
    this.room = {
      ...this.room,
      ...this.form.value
    }
    const room = this.room
    const base = CommonUtil.modalBase(
      RoomDetailComponent,
      {
        isUpdate: true,
        room
      },
      '40%'
    )
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success) {
        console.log(result.value)
      }
    })
  }

  initForm(){
    this.form = this.fb.group({
      code: [
        {
          value: this.room.code,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      name: [
        {
          value: this.room?.name,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      locationId: [
        {
          value: this.room.locationId,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      maxRow: [
        {
          value: this.room.maxRow,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      maxChairPerRow: [
        {
          value: this.room.maxChairPerRow,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      description: [
        {
          value: this.room.description,
          disabled: this.isDetail ? true : false
        }
      ]
    })
  }

  loadLocation(data: any){
    this.locationService.autoComplete({keyword: data}).subscribe(response =>{
      this.locationList = response?.data;
    })
  }

  submit(){
    if(this.isCreate) {
      this.create();
    }else {
      this.update();
    }
  }

  create(){
    const body = {
      ...this.form.value
    };
    this.roomService.create(body).subscribe(response =>{
      if(response.success) {
        this.room = response?.data;
        this.router.navigate[`business/rooms/${this.room.id}/update`];
        this.isUpdate = true;
        this.isCreate = false;
      }
    })
  }

  update(){
  }

  findRoomById(id?: string){
    this.roomService.getById(id).subscribe(response => {
      this.room = response.data;
      this.locationList = this.room.location ? [this.room.location] : [];
      this.initForm();
    })
  }
}
