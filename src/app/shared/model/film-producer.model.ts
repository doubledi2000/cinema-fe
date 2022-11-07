export interface IFilmProducer{
  id?: string;
  filmId?: string;
  producerId?: string;
  deleted?: boolean;
  producerName?: string;
  producerCode?: string;
}

export class FilmProducer implements IFilmProducer{
  constructor(
    public id?: string,
    public filmId?: string,
    public producerId?: string,
    public deleted?: boolean,
    public producerName?: string,
    public producerCode?: string
  ){
  }
}
