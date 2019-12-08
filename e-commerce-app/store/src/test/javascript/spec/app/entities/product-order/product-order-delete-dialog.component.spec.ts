import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { ProductOrderDeleteDialogComponent } from 'app/entities/product-order/product-order-delete-dialog.component';
import { ProductOrderService } from 'app/entities/product-order/product-order.service';

describe('Component Tests', () => {
  describe('ProductOrder Management Delete Component', () => {
    let comp: ProductOrderDeleteDialogComponent;
    let fixture: ComponentFixture<ProductOrderDeleteDialogComponent>;
    let service: ProductOrderService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductOrderDeleteDialogComponent]
      })
        .overrideTemplate(ProductOrderDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductOrderDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOrderService);
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
