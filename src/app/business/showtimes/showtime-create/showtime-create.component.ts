import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilmService } from '../../../shared/service/film.service';
import { IFilm } from '../../../shared/model/film.model';
import CommonUtil from '../../../shared/utils/common-util';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../shared/service/location.service';
import { RoomService } from '../../../shared/service/room.service';
import { ILocation } from '../../../shared/model/location.model';
import { IRoom } from '../../../shared/model/room.model';
import * as moment from 'moment';
import { ShowtimeService } from '../../../shared/service/showtime.service';

@Component({
  selector: 'app-showtime-create',
  templateUrl: './showtime-create.component.html',
  styleUrls: ['./showtime-create.component.scss']
})
export class ShowtimeCreateComponent implements OnInit {
  time = new Date();
  isVisible = false;
  form: FormGroup = new FormGroup({});
  locationList: ILocation[] = [];
  roomList: IRoom[] = [];
  filmList: IFilm[] = [];
  filmId = '';
  showtimeList: any[] = [];
  lastEndAt = 0;
  constructor(
    private fb: FormBuilder,
    private filmService: FilmService,
    private toastrService: ToastrService,
    private locaitonService: LocationService,
    private roomService: RoomService,
    private showtimeService: ShowtimeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadLocation();
    this.loadRoom();
  }

  initForm(){
    this.form = this.fb.group({
      locationId: [
       '',
        [Validators.required]
      ],
      roomId: [
        ''
        ,
        [Validators.required]
      ],
      premierDate: [
        new Date(),
        [Validators.required]
      ]
    })
  }

  loadLocation(){
    this.locaitonService.autoComplete({}).subscribe(response=>{
      if(response && response.success) {
        this.locationList = response.data as ILocation[]
      }
    })
  }

  loadRoom(){
    this.roomService.search({}).subscribe(response =>{
      if(response && response.success) {
        this.roomList = response.data as IRoom[];
      }
    })
  }
  showModal(): void {
    this.filmService.search({}).subscribe(res =>{
      this.filmList = res.data;
      console.log(this.filmList)
    })
    this.isVisible = true;
  }

  printTime(data: any){
    let start = CommonUtil.printTime(data.startAt);
    let end = CommonUtil.printTime(data.endAt);
    return start + '-' + end;
  }

  handleCancel(){
    this.isVisible = false;
  }

  onCancel(){
  }

  delete(i: number) {
    this.showtimeList.splice(i, this.showtimeList.length - i);
    const showtimeIndex = this.showtimeList.length;
    if(showtimeIndex == 0) {
      this.lastEndAt = 0;
    }else [
      this.lastEndAt = this.showtimeList[showtimeIndex].endAt
    ]
  }

  onSubmit(){
    const body = {
      ...this.form.value,
      films: this.showtimeList,
      primierDate: moment(this.time).format('yyyy-MM-DD')
    }
    console.log(body)
    this.showtimeService.create(body).subscribe(response =>{
      if(response && response.success) {
        this.toastrService.success('Thêm mới lịch chiếu phim thành công');
        this.showtimeList = [];
        this.lastEndAt = 0;
      }else{
        this.toastrService.success('Thêm mới lịch chiếu phim thành công');

      }
    })
  }
  handleOk(){
    const film = this.filmList.find((ele)=>{
      return ele.id == this.filmId;
    })
    if(CommonUtil.getTime(this.time) <= this.lastEndAt){
      this.toastrService.error('Thời gian bắt đầu không hợp lệ');
      this.isVisible = false;
      return;
    }
    this.showtimeList.push({
      filmId: this.filmId,
      startAt: CommonUtil.getTime(this.time),
      endAt: CommonUtil.getTime(this.time)+ film.duration,
      filmName: film.name
    })
    this.lastEndAt = CommonUtil.getTime(this.time)+ film.duration;
    this.isVisible = false;
  }
}
