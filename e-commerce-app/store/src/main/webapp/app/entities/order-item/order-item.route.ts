import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { OrderItemComponent } from './order-item.component';
import { OrderItemDetailComponent } from './order-item-detail.component';
import { OrderItemUpdateComponent } from './order-item-update.component';
import { IOrderItem } from 'app/shared/model/order-item.model';

@Injectable({ providedIn: 'root' })
export class OrderItemResolve implements Resolve<IOrderItem> {
  constructor(private service: OrderItemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderItem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((orderItem: HttpResponse<OrderItem>) => orderItem.body));
    }
    return of(new OrderItem());
  }
}

export const orderItemRoute: Routes = [
  {
    path: '',
    component: OrderItemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.orderItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderItemDetailComponent,
    resolve: {
      orderItem: OrderItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.orderItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderItemUpdateComponent,
    resolve: {
      orderItem: OrderItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.orderItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderItemUpdateComponent,
    resolve: {
      orderItem: OrderItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.orderItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
