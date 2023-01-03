import { AUTO_STYLE } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { RULE } from 'src/app/shared/constant/authority.constant';

import { DrinkDetailComponent } from './drink-price/drink-detail/drink-detail.component';
import { DrinkPriceComponent } from './drink-price/drink-price.component';
import { RoleComponent } from './role/role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { TicketPriceComponent } from './ticket-price/ticket-price.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.USER_VIEW]
    }
  },
  {
    path: 'user/:id/detail',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.USER_VIEW]
    }
  },
  {
    path: 'user/create',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.USER_CREATE]
    }
  },
  {
    path: 'role',
    component: RoleComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ROLE_VIEW]
    }
  },
  {
    path: ':/id/update',
    component: UpdateRoleComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ROLE_UPDATE]
    }
  },
  {
    path: 'permission-update',
    component: UpdateRoleComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.ROLE_UPDATE]
    }
  },
  {
    path: 'ticket-price',
    component: TicketPriceComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.PRICE_VIEW]
    }
  },
  {
    path: 'drink-detail',
    component: DrinkDetailComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.DRINK_VIEW]
    }
  },
  {
    path: 'drink',
    component: DrinkPriceComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: [RULE.DRINK_UPDATE]
    }
  },
  {
    path: 'my-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: []
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
