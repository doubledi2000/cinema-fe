export interface IItem {
  id?: string;
  type?: string;
  quantity?: number;
  price?: number;
  itemId?: string;
  itemName?: string;
  deleted?: boolean;
  invoiceId?: string;
}

export class Item implements IItem{
  constructor(
    public id?: string,
    public type?: string,
    public quantity?: number,
    public price?: number,
    public itemId?: string,
    public itemName?: string,
    public deleted?: boolean,
    public invoiceId?: string
  ){}
}
