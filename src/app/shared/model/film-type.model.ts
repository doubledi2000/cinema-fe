export interface IFilmType{
  id?: string;
  filmId?: string;
  producerId?: string;
  deleted?: boolean;
  typeName?: string;
  typeCode?: string;
}

export class FilmType implements IFilmType{
  constructor(
    public id?: string,
    public filmId?: string,
    public producerId?: string,
    public deleted?: boolean,
    public typeName?: string,
    public typeCode?: string
  ){
  }
}
