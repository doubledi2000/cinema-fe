import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomDetailComponent } from '../room-detail/room-detail.component';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.scss']
})
export class RoomUpdateComponent implements OnInit {

  constructor(private modalService: NzModalService) { }

  ngOnInit(): void {
  }

  openRoomSetting() {
    this.modalService.create(
      {nzContent: RoomDetailComponent,
        nzWidth: 600
      }
    )
  }
}
