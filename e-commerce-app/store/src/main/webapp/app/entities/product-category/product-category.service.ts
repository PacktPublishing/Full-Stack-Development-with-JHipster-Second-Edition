import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductCategory } from 'app/shared/model/product-category.model';

type EntityResponseType = HttpResponse<IProductCategory>;
type EntityArrayResponseType = HttpResponse<IProductCategory[]>;

@Injectable({ providedIn: 'root' })
export class ProductCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/product-categories';

  constructor(protected http: HttpClient) {}

  create(productCategory: IProductCategory): Observable<EntityResponseType> {
    return this.http.post<IProductCategory>(this.resourceUrl, productCategory, { observe: 'response' });
  }

  update(productCategory: IProductCategory): Observable<EntityResponseType> {
    return this.http.put<IProductCategory>(this.resourceUrl, productCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
