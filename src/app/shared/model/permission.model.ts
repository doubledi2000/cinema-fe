export interface IPermission {
  id?: string;
  resourceCode?: string;
  resourceName?: string;
  name?: string;
  scope?: any;
  deleted?: boolean;
  checked?: boolean;
}

export class Permission implements IPermission{
  constructor(
    public id?: string,
    public sersourceCode?: string,
    public resourceName?: string,
    public name?: string,
    public scope?: any,
    public deleted?: boolean,
    public checked?: boolean
  ){}
}
