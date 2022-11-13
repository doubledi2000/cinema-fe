export interface IRolePermission {
  id?: string;
  resourceCode?: string;
  roleCode?: string;
  scope?: any;
  scopes?: any[];
  checked?: boolean;
  deleted?: boolean;
}

export class RolePermission implements IRolePermission{
  constructor(
    public id?: string,
    public resourceCode?: string,
    public roleCode?: string,
    public scope?: any,
    public scopes?: any[],
    public checked?: boolean,
    public deleted?: boolean
  ){}
}
