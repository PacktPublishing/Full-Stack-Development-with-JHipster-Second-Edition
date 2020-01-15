import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { OrderItemDeleteDialogComponent } from 'app/entities/order-item/order-item-delete-dialog.component';
import { OrderItemService } from 'app/entities/order-item/order-item.service';

describe('Component Tests', () => {
  describe('OrderItem Management Delete Component', () => {
    let comp: OrderItemDeleteDialogComponent;
    let fixture: ComponentFixture<OrderItemDeleteDialogComponent>;
    let service: OrderItemService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [OrderItemDeleteDialogComponent]
      })
        .overrideTemplate(OrderItemDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderItemDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderItemService);
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
