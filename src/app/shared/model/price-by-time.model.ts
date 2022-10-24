export interface IPriceByTime{
    id?: string;
    price?: number;
    ticketType?: string;
    configPriceId?: string;
}

export class PriceByTime implements IPriceByTime{
    constructor(
        public id?: string,
        public price?: number,
        public ticketType?: string,
        public configPriceId?: string
    ){}
}