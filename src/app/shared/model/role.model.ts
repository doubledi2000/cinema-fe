import { IRolePermission } from './role-permission.model';
export interface IRole{
  id?: string;
  code?:string;
  name?: string;
  description?: string;
  isRoot?: boolean;
  status?: string;
  deleted?: boolean;
  permissions?: IRolePermission[];
  permissionIds?: string[];
}

export class Role implements IRole{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public description?: string,
    public isRoot?: boolean,
    public status?: string,
    public deleted?: boolean,
    public permissions?: IRolePermission[],
    public permissionIds?: string[]
  ){

  }
}
