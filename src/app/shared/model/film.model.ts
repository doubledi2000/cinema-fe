import { ITypeOfFilm } from "./type-of-film.model";
import { IFilmProducer } from './film-producer.model';
import { IFilmType } from './film-type.model';

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
    producerIds?: string[];
    actors?: string;
    directors?: string;
    typeOfFilms?: ITypeOfFilm;
    filmTypeIds?: string[];
    filmProducers?: IFilmProducer[],
    filmTypes?: IFilmType[]
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
        public producerIds?: string[],
        public typeOfFilms?: ITypeOfFilm,
        public filmTypeIds?: string[],
        public actors?: string,
        public directors?: string,
        public filmProducers?: IFilmProducer[],
        public filmTypes?: IFilmType[]
    ){
    }
}
