import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash'
import { PermissionService } from '../../../../shared/service/permission.service';
import { IRolePermission } from '../../../../shared/model/role-permission.model';
import { Role, IRole } from '../../../../shared/model/role.model';
import { IPermission, Permission } from '../../../../shared/model/permission.model';
import { RoleService } from '../../../../shared/service/role.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.scss']
})
export class UpdatePermissionComponent implements OnInit {

  @Input() role: Role = new Role();
  rolePermissions: any[] = [];
  rolePermissionRequest: IRolePermission[] = [];

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.getListPermission();
  }

  getListPermission(){
    this.permissionService.findAll().subscribe(response =>{
      let resultsBefore = response.data;
      this.roleService.getById(this.role.id).subscribe(res => {
        if(res && res.success) {
          const role = res.data as IRole;
          resultsBefore.forEach(e => {
            const check = role.permissionIds.some((ele) => ele == e.id);
            e.checked = check;
          })
        }
      })
      let results = _(resultsBefore).groupBy((x)=> x.resourceCode).map((value, key) => ({resourceCode: key, per: value})).value();
      this.rolePermissions = results;
      console.log(this.rolePermissions);
    })
  }

  onCancel(){
    this.nzModalRef.close(
      {
        success: false
      }
    );
  }

  updatePermission(){
    this.rolePermissionRequest = [];
    for(let rolePermission of this.rolePermissions) {
      const i = this.rolePermissionRequest.length;
      this.rolePermissionRequest.push({
        resourceCode: rolePermission.resourceCode,
        scopes: [],
      });

      for (const rolePer of rolePermission.per) {
        if (rolePer.checked === true) {
          this.rolePermissionRequest[i].scopes?.push(rolePer.scope);
        }
      }
    }
    const role = this.role;
    role.permissions = this.rolePermissionRequest;
    const body = {
      permissions: this.rolePermissionRequest
    };
    this.roleService.permission(this.role.id, body).subscribe(res => {
      if(res && res.success) {
        this.toastrService.success('Phân quyền thành công');
        this.nzModalRef.close(
          {
            success: true
          }
        );
      }
    })
  }

    // change checked
    changeCheckPermission(item: IPermission): void {
      for (const permissions of this.rolePermissions) {
        if (permissions.resourceCode === item.resourceCode) {
          for (const per of permissions.per) {
            if (per.scope === item.scope) {
              item.checked = !item.checked;
            }
          }
        }
      }
    }
}
