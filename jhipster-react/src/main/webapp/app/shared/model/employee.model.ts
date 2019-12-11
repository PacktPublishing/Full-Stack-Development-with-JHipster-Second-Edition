import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IEmployee {
  id?: number;
  name?: string;
  age?: number;
  dob?: Moment;
  user?: IUser;
}

export const defaultValue: Readonly<IEmployee> = {};
