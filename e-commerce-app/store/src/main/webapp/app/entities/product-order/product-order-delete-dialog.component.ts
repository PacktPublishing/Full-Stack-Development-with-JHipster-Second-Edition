import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';

@Component({
  templateUrl: './product-order-delete-dialog.component.html'
})
export class ProductOrderDeleteDialogComponent {
  productOrder: IProductOrder;

  constructor(
    protected productOrderService: ProductOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'productOrderListModification',
        content: 'Deleted an productOrder'
      });
      this.activeModal.dismiss(true);
    });
  }
}
