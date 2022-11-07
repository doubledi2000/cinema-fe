import { ITicket } from './ticket.model';
export interface IRowShowtime{
  rowNumber?: number;
  rowName?: string;
  tickets?: ITicket[]
}

export class RowShowtime{
  constructor(
    public rowNumber?: number,
    public rowName?: string,
    public tickets?: ITicket[]
  ){}
}
