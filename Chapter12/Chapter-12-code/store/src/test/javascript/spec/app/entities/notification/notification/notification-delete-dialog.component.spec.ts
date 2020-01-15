import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../../test.module';
import { NotificationDeleteDialogComponent } from 'app/entities/notification/notification/notification-delete-dialog.component';
import { NotificationService } from 'app/entities/notification/notification/notification.service';

describe('Component Tests', () => {
  describe('Notification Management Delete Component', () => {
    let comp: NotificationDeleteDialogComponent;
    let fixture: ComponentFixture<NotificationDeleteDialogComponent>;
    let service: NotificationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [NotificationDeleteDialogComponent]
      })
        .overrideTemplate(NotificationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotificationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationService);
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
