import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpdatePermissionComponent } from './update-permission/update-permission.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  enableModal: boolean = false;

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    const modal = this._modal.create({
      nzTitle: 'Modal Title',
      nzContent: UpdatePermissionComponent,
      nzViewContainerRef: this._viewContainerRef,
    })
  }
}
