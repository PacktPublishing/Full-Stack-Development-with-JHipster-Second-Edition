import { IUser } from '@/shared/model/user.model';

export interface IEmployee {
  id?: number;
  name?: string;
  age?: number;
  dob?: Date;
  user?: IUser;
}

export class Employee implements IEmployee {
  constructor(public id?: number, public name?: string, public age?: number, public dob?: Date, public user?: IUser) {}
}
