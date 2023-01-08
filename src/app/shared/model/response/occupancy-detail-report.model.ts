export interface IOccupancyDetailReportResponse{
  locationCode?: string;
  locationName?: string;
  filmCode?: string;
  filmName?: string;
  totalNormalTicket?: number;
  totalNormalTicketWasSold?: number;
  totalVIPTicket?: number;
  totalVIPTicketWasSold?: number;
  totalSweetTicket?: number;
  totalSweetTicketWasSold?: number;
}
