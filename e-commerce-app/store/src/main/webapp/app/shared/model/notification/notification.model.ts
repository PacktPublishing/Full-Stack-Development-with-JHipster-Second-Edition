import { Moment } from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  date?: Moment;
  details?: string;
  sentDate?: Moment;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public date?: Moment,
    public details?: string,
    public sentDate?: Moment,
    public format?: NotificationType,
    public userId?: number,
    public productId?: number
  ) {}
}
