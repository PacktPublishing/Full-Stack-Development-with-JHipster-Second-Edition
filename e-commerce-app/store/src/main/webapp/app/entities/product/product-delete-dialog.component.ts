import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-delete-dialog.component.html'
})
export class ProductDeleteDialogComponent {
  product: IProduct;

  constructor(protected productService: ProductService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'productListModification',
        content: 'Deleted an product'
      });
      this.activeModal.dismiss(true);
    });
  }
}
