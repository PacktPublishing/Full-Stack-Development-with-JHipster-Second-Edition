import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.StoreProductModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.StoreProductCategoryModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.StoreCustomerModule)
      },
      {
        path: 'product-order',
        loadChildren: () => import('./product-order/product-order.module').then(m => m.StoreProductOrderModule)
      },
      {
        path: 'order-item',
        loadChildren: () => import('./order-item/order-item.module').then(m => m.StoreOrderItemModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice/invoice.module').then(m => m.InvoiceInvoiceModule)
      },
      {
        path: 'shipment',
        loadChildren: () => import('./invoice/shipment/shipment.module').then(m => m.InvoiceShipmentModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification/notification.module').then(m => m.NotificationNotificationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class StoreEntityModule {}
