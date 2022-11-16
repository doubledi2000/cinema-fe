import { IPrice } from './price.model';
export interface IPriceByTime{
    id?: string;
    startAt?: number;
    endAt?: number;
    priceConfigId?: string;
    prices?: IPrice[]
}

export class PriceByTime implements IPriceByTime{
    constructor(
        public id?: string,
        public startAt?: number,
        public endAt?: number,
        public priceConfigId?: string,
        public prices?: IPrice[]
    ){}
}
