export interface IProducer{
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  representative?: string;
  nationally?: string;
  deleted?: boolean;
  status?: string;
}

export class Producer implements IProducer{
  constructor(
    public id?: string,
    public name?: string,
    public code?: string,
    public description?: string,
    public representative?: string,
    public nationally?: string,
    public deleted?: boolean,
    public status?: string
  ){}
}
