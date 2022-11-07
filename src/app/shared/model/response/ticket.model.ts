export interface ITicket{
  id?: string;
  code?: string;
  name?: string;
  chairId?: string;
  showtimeId?: string;
  status?: string;
  type?: string;
  filmId?: string;
  roomId?: string;
  boughtAt?: number | any;
  userSoldId?: string | null;
  rowId?: string;
  rowNumber?: number;
  rowName?: string;
  serialOfChair?: number;
  deleted?: boolean;
}

export class Ticket{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public chairId?: string,
    public showtimeId?: string,
    public status?: string,
    public type?: string,
    public filmId?: string,
    public boughtAt?: number | any,
    public userSoldId?: string | null,
    public rowId?: string,
    public rowNumber?: number,
    public rowName?: string,
    public serialOfChair?: number,
    public deleted?: boolean
  ){}
}
