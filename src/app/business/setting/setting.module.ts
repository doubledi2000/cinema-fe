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
import { DrinkDetailComponent } from './drink-price/drink-detail/drink-detail.component';
import { AddPriceModalComponent } from './ticket-price/add-price-modal/add-price-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    RoleComponent,
    UserComponent,
    UpdateUserComponent,
    UpdateRoleComponent,
    UpdatePermissionComponent,
    TicketPriceComponent,
    DrinkPriceComponent,
    DrinkDetailComponent,
    AddPriceModalComponent,
    ProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ],
  exports: [
    ChangePasswordComponent,
    ProfileComponent
  ]
})
export class SettingModule { }
