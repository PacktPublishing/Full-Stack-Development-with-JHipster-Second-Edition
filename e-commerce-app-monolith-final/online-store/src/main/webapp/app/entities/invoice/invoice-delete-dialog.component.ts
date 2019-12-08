import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  templateUrl: './invoice-delete-dialog.component.html'
})
export class InvoiceDeleteDialogComponent {
  invoice: IInvoice;

  constructor(protected invoiceService: InvoiceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.invoiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'invoiceListModification',
        content: 'Deleted an invoice'
      });
      this.activeModal.dismiss(true);
    });
  }
}
