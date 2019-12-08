import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryUpdateComponent } from './product-category-update.component';
import { ProductCategoryDeleteDialogComponent } from './product-category-delete-dialog.component';
import { productCategoryRoute } from './product-category.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(productCategoryRoute)],
  declarations: [
    ProductCategoryComponent,
    ProductCategoryDetailComponent,
    ProductCategoryUpdateComponent,
    ProductCategoryDeleteDialogComponent
  ],
  entryComponents: [ProductCategoryDeleteDialogComponent]
})
export class StoreProductCategoryModule {}
