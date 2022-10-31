import { IBaseDomain } from './base-domain.model';
import { IRow } from './row.model';
import { ILocation } from './location.model';
export interface IRoom extends IBaseDomain {
  description?: string;
  status?: string;
  maxRow?: number;
  maxChairPerRow?: number;
  locationId?: string;
  rows?: IRow[];
  location?: ILocation;
}

export class Room implements IRoom{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public description?: string,
    public status?: string,
    public maxRow?: number,
    public maxChairPerRow?: number,
    public locationId?: string,
    public rows?: IRow[],
    public location?: ILocation
  ){

  }
}
