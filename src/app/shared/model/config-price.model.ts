import { IPriceByTime } from "./price-by-time.model";

export interface IConfigPrice{
    id?: string;
    type?: string;
    special?: boolean;
    specialBy?: string;
    startAt?: number;
    endAt?: number;
    status?: string;
    priceByTimes?: IPriceByTime[];
}

export class ConfigPrice implements IConfigPrice{
    constructor(
        public  id?: string,
        public type?: string,
        public special?: boolean,
        public startAt?: number,
        public endAt?: number,
        public specialBy?: string,
        public status?: string,
        public priceByTimes?: IPriceByTime[]
    ){}
}