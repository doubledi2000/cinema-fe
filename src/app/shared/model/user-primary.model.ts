export class UserPrimary{
  constructor(
    public userId?: string,
    public grantedPermissions?: any[],
    public isRoot?: boolean,
    public locationIds?: string[],
    public userLevel?: string,
  ){}
}
