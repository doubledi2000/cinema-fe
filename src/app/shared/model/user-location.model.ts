import { IUser } from './user.model';
import { ILocation } from './location.model';
export interface IUserLocation{
  id?: string;
  buildingId?: string;
  userId?: string;
  deleted?: boolean;
  user?: IUser;
  location?: ILocation;
}
