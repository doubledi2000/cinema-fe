import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdatePermissionComponent } from './role/update-permission/update-permission.component';
import { TicketPriceComponent } from './ticket-price/ticket-price.component';
import { DrinkPriceComponent } from './drink-price/drink-price.component';


@NgModule({
  declarations: [
    RoleComponent,
    UserComponent,
    UpdateUserComponent,
    UpdateRoleComponent,
    UpdatePermissionComponent,
    TicketPriceComponent,
    DrinkPriceComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
