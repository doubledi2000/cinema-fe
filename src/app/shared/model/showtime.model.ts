import { IFilm } from './film.model';
import { IRoom } from './room.model';
import { IRowShowtime } from './response/row-showtime.model';
export interface IShowtime{
  id?: string;
  premiereDate?: Date;
  startAt?: number;
  endAt?: number;
  roomId?: string;
  filmId?: string;
  status?: string;
  autoGenerateTicket?: boolean;
  film?: IFilm;
  room?: IRoom;
  rows?: IRowShowtime[];
}

export class Showtime implements IShowtime{
  constructor(
    public id?: string,
    public premiereDate?: Date,
    public startAt?: number,
    public endAt?: number,
    public roomId?: string,
    public filmId?: string,
    public status?: string,
    public autoGenerateTicket?: boolean,
    public film?: IFilm,
    public room?: IRoom,
    public rows?: IRowShowtime[]
  ){}
}
