import { IBaseDomain } from './base-domain.model';
import { IChair } from './chair.model';
export interface IRow extends IBaseDomain{
  rowNumber?: number,
  roomId?: string,
  chairs?: IChair[]
}

export class Row implements IRow{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public rowNumber?: number,
    public roomId?: string,
    public chairs?: IChair[]
  ){
  }
}
