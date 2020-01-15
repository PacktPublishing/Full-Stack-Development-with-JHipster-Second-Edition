import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';

@Component({
  templateUrl: './shipment-delete-dialog.component.html'
})
export class ShipmentDeleteDialogComponent {
  shipment: IShipment;

  constructor(protected shipmentService: ShipmentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.shipmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'shipmentListModification',
        content: 'Deleted an shipment'
      });
      this.activeModal.dismiss(true);
    });
  }
}
