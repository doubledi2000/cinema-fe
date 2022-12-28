export interface IRevenueReport {
  locationId?: string;
  locationName?: string;
  locationCode?: string;
  totalTicketRevenue?: number;
  totalDrinkRevenue?: number;
  totalRevenue?: number;
}

export class RevenueReport implements IRevenueReport {
  constructor(
    public locatoinId?: string,
    public locationName?: string,
    public locationCode?: string,
    public totalTicketRevenue?: number,
    public totalDrinkRevenue?: number,
    public totalRevenue?: number
  ) {}
}
