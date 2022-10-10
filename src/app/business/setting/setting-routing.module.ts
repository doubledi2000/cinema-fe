import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UpdatePermissionComponent } from './role/update-permission/update-permission.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { TicketPriceComponent } from './ticket-price/ticket-price.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserComponent
  },
  {
    path: 'user-detail',
    component: UpdateUserComponent
  },
  {
    path: 'role-list',
    component: RoleComponent
  },
  {
    path: 'role-update',
    component: UpdateRoleComponent
  },
  {
    path: 'permission-update',
    component: UpdateRoleComponent
  },
  {
    path: 'ticket-price',
    component: TicketPriceComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
