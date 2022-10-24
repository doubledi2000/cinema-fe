import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomUpdateComponent } from './room-update/room-update.component';

const routes: Routes = [
  {
    path: 'detail',
    component: RoomUpdateComponent
  },
  {
    path: '',
    component: RoomListComponent
  },
  {
    path: 'seat-setting',
    component: RoomDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
