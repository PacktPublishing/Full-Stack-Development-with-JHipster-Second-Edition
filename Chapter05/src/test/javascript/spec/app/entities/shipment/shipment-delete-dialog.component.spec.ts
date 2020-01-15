import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { ShipmentDeleteDialogComponent } from 'app/entities/shipment/shipment-delete-dialog.component';
import { ShipmentService } from 'app/entities/shipment/shipment.service';

describe('Component Tests', () => {
  describe('Shipment Management Delete Component', () => {
    let comp: ShipmentDeleteDialogComponent;
    let fixture: ComponentFixture<ShipmentDeleteDialogComponent>;
    let service: ShipmentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ShipmentDeleteDialogComponent]
      })
        .overrideTemplate(ShipmentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShipmentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipmentService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
