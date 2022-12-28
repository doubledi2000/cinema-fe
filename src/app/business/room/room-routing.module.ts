import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { RULE } from 'src/app/shared/constant/authority.constant';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomUpdateComponent } from './room-update/room-update.component';

const routes: Routes = [
  {
    path: ':id/update',
    component: RoomUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ZOOM_UPDATE]
    }
  },
  {
    path: ':id/detail',
    component: RoomUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ZOOM_VIEW]
    }
  },
  {
    path: 'create',
    component: RoomUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ZOOM_CREATE]
    }
  },
  {
    path: '',
    component: RoomListComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ZOOM_VIEW]
    }
  },
  {
    path: 'seat-setting',
    component: RoomDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ZOOM_CREATE, RULE.ZOOM_UPDATE]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
