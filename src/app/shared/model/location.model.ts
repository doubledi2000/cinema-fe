import { IBaseDomain } from './base-domain.model';
import { IRoom } from './room.model';
export interface ILocation extends IBaseDomain{
  address?: string;
  status?: string;
  rooms?: IRoom[];
}

export class Location implements ILocation{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public address?: string,
    public status?: string,
    public rooms?: IRoom[]
  ){
  }
}
