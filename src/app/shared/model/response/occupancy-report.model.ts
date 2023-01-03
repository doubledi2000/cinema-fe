export interface IOccupancyReportResponse {
  filmId?: string;
  filmCode?: string;
  filmName?: string;
  totalTicket?: number;
  totalTicketWasSold?: number;
}

export class OccupancyReportResponse implements IOccupancyReportResponse{
  constructor(
    public filmId?: string,
    public filmCode?: string,
    public filmName?: string,
    public totalTicket?: number,
    public totalTicketWasSold?: number
  ){}
}
