export interface IPrice{
  id?: string;
  price?: number;
  priority?: number;
  chairType?: string;
  priceByTimeId?: string;
}

export class Price implements IPrice{
  constructor(
    public id?: string,
    public price?: number,
    public priority?: number,
    public chairType?: string,
    public priceByTimeId?: string,
  ){}
}
