import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';

@Component({
  templateUrl: './customer-delete-dialog.component.html'
})
export class CustomerDeleteDialogComponent {
  customer: ICustomer;

  constructor(protected customerService: CustomerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.customerService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'customerListModification',
        content: 'Deleted an customer'
      });
      this.activeModal.dismiss(true);
    });
  }
}
