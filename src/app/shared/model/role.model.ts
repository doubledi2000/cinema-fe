import { IRolePermission } from './role-permission.model';
export interface IRole{
  id?: string;
  code?:string;
  name?: string;
  description?: string;
  isRoot?: boolean;
  roleStatus?: string;
  deleted?: boolean;
  permissions?: IRolePermission[];
}

export class Role implements IRole{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public description?: string,
    public isRoot?: boolean,
    public roleStatus?: string,
    public deleted?: boolean,
    public permissions?: IRolePermission[]
  ){

  }
}
