import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { ProductOrderComponent } from './product-order.component';
import { ProductOrderDetailComponent } from './product-order-detail.component';
import { ProductOrderUpdateComponent } from './product-order-update.component';
import { ProductOrderDeleteDialogComponent } from './product-order-delete-dialog.component';
import { productOrderRoute } from './product-order.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(productOrderRoute)],
  declarations: [ProductOrderComponent, ProductOrderDetailComponent, ProductOrderUpdateComponent, ProductOrderDeleteDialogComponent],
  entryComponents: [ProductOrderDeleteDialogComponent]
})
export class StoreProductOrderModule {}
