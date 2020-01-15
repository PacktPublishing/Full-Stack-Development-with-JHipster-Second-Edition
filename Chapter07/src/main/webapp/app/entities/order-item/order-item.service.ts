import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrderItem } from 'app/shared/model/order-item.model';

type EntityResponseType = HttpResponse<IOrderItem>;
type EntityArrayResponseType = HttpResponse<IOrderItem[]>;

@Injectable({ providedIn: 'root' })
export class OrderItemService {
  public resourceUrl = SERVER_API_URL + 'api/order-items';

  constructor(protected http: HttpClient) {}

  create(orderItem: IOrderItem): Observable<EntityResponseType> {
    return this.http.post<IOrderItem>(this.resourceUrl, orderItem, { observe: 'response' });
  }

  update(orderItem: IOrderItem): Observable<EntityResponseType> {
    return this.http.put<IOrderItem>(this.resourceUrl, orderItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
