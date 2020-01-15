import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryUpdateComponent } from './product-category-update.component';
import { IProductCategory } from 'app/shared/model/product-category.model';

@Injectable({ providedIn: 'root' })
export class ProductCategoryResolve implements Resolve<IProductCategory> {
  constructor(private service: ProductCategoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductCategory> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((productCategory: HttpResponse<ProductCategory>) => productCategory.body));
    }
    return of(new ProductCategory());
  }
}

export const productCategoryRoute: Routes = [
  {
    path: '',
    component: ProductCategoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductCategoryDetailComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductCategoryUpdateComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductCategoryUpdateComponent,
    resolve: {
      productCategory: ProductCategoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.productCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
