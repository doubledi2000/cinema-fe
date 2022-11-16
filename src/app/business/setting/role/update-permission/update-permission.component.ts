import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash'
import { PermissionService } from '../../../../shared/service/permission.service';
import { IRolePermission } from '../../../../shared/model/role-permission.model';
import { Role } from '../../../../shared/model/role.model';
import { IPermission } from '../../../../shared/model/permission.model';
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
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.getListPermission();
  }

  getListPermission(){
    this.permissionService.findAll().subscribe(response =>{
      const results = _(response.data).groupBy((x)=> x.resourceCode).map((value, key) => ({resourceCode: key, per: value})).value();

      this.rolePermissions = results;
      console.log(results)
    })
  }

  onCancel(){

  }

  updatePermission(){
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
    console.log(this.rolePermissionRequest)
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
