import { IPriceByTime } from './price-by-time.model';
export interface IPriceConfig{
  id?: string;
  dayOfWeek?: number;
  special?: boolean;
  status?: string;
  locationId?: string;
  priceByTimes?: IPriceByTime[];
}

export class PriceConfig implements IPriceConfig{
  constructor(
    public id?: string,
    public dayOfWeek?: number,
    public special?: boolean,
    public status?: string,
    public locationId?: string,
    public priceByTimes?: IPriceByTime[],
  ){}
}
