export interface ITypeOfFilm{
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    status?: string;
}

export class TypeOfFilm implements ITypeOfFilm{
    constructor(
        public id?: string,
        public code?: string,
        public name?: string,
        public description?: string,
        public status?: string
    ){
    }
}