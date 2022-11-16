import { IPriceConfig } from '../price-config.model';
export interface ILocationPriceConfig{
  locationId?: string;
  locationCode?: string;
  locationName?: string;
  priceConfigs?: IPriceConfig[]
}

export class LocationPriceConfig{
  constructor(
    public locationId?: string,
    public locationCode?: string,
    public locationName?: string,
    public priceConfigs?: IPriceConfig[]

  ){

  }
}
