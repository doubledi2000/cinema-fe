import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  {
    path: 'detail',
    component: RoomDetailComponent
  },
  {
    path: 'list',
    component: RoomListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
