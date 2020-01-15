import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { InvoiceDeleteDialogComponent } from 'app/entities/invoice/invoice-delete-dialog.component';
import { InvoiceService } from 'app/entities/invoice/invoice.service';

describe('Component Tests', () => {
  describe('Invoice Management Delete Component', () => {
    let comp: InvoiceDeleteDialogComponent;
    let fixture: ComponentFixture<InvoiceDeleteDialogComponent>;
    let service: InvoiceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [InvoiceDeleteDialogComponent]
      })
        .overrideTemplate(InvoiceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceService);
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
