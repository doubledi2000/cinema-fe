import { IShowtime } from '../showtime.model';
import { IFilm } from '../film.model';
export interface IShowtimeByFilm{
  filmId?: string;
  premiereDate?: Date;
  details?: IShowtime[];
  film?: IFilm
}

export class ShowtimeByFilm implements IShowtimeByFilm{
  constructor(
    public filmId?: string,
    public premiereDate?: Date,
    public details?: IShowtime[],
    public film?: IFilm
  ){}
}
