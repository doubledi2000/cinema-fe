import { IBaseDomain } from './base-domain.model';
export interface IChair extends IBaseDomain {
  serialOfChair?: number,
  chairType?: string,
  rowId?: string;
}

export class Chair implements IChair{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public serialOfChair?: number,
    public chairType?: string,
    public rowId?: string,
  ){
  }
}
