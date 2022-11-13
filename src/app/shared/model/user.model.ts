import { IUserLocation } from './user-location.model';
export interface IUser{
  id?: string;
  username?: string;
  password?:string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dayOfBirth?: Date;
  gender?: string;
  employeeCode?: string;
  title?: string;
  departmentName?: string;
  description?: string;
  status?: string;
  avatartFileId?: string;
  locationIds?: string[];
  locations?: IUserLocation[];
}

export class User implements IUser{
  constructor(
    public id?: string,
    public username?: string,
    public password?: string,
    public fullName?: string,
    public email?: string,
    public phoneNumber?: string,
    public dayOfBirth?: Date,
    public gender?: string,
    public employeeCode?: string,
    public title?: string,
    public departmentName?: string,
    public description?: string,
    public status?: string,
    public avatarFileIds?: string,
    public locationIds?: string[],
    public locations?: IUserLocation[]
  ){

  }
}
