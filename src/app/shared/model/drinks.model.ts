export interface IDrink{
  id?: string;
  code?: string;
  name?: string;
  price?: number;
  locationId?: string;
  status?: string;
  description?: string;
  fileId?: string;
  filePath?: string;
  locationName?: string;
}

export class Drink implements IDrink{
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public price?: number,
    public locationId?: string,
    public status?: string,
    public description?: string,
    public fileId?: string,
    public filePath?: string,
    public locationName?: string
  ){

  }
}
