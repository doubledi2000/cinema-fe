import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomListComponent } from './room-list/room-list.component';


@NgModule({
  declarations: [
    RoomDetailComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule
  ]
})
export class RoomModule { }
