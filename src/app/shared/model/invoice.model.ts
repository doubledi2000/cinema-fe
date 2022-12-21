import { IItem } from './item.model';
import { ITicket } from './response/ticket.model';
export interface IInvoice {
  id?: string;
  userId?: string;
  paymentTime?: Date;
  total?: number;
  deleted?: boolean;
  locationId?: string;
  items?: IItem[];
  tickets?: ITicket[];
}

export class Invoice implements IInvoice{
  constructor(
    public id?: string,
    public userId?: string,
    public paymentTime?: Date,
    public total?: number,
    public deleted?: boolean,
    public loationId?: string,
    public items?: IItem[],
    public tickets?: ITicket[],
  ){}
}
