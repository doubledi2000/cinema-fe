import { ITypeOfFilm } from "./type-of-film.model";

export interface IFilm{
    id?: string;
    code?: string;
    name?: string;
    allowedAgeFrom?: number;
    status?: string;
    description?: string;
    releaseDate?: Date;
    ownershipDate?: Date;
    duration?: number;
    producerId?: string;
    typeOfFilms?: ITypeOfFilm;
    filmTypeIds?: string[];
}

export class Film implements IFilm{
    constructor(
        public id?: string,
        public code?: string,
        public name?: string,
        public allowedAgeFrom?: number,
        public status?: string,
        public description?: string,
        public releaseDate?: Date,
        public ownershipDate?: Date,
        public duration?: number,
        public producerId?: string,
        public typeOfFilms?: ITypeOfFilm,
        public filmTypeIds?: string[]
    ){

    }

}
