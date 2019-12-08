import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../../test.module';
import { NotificationUpdateComponent } from 'app/entities/notification/notification/notification-update.component';
import { NotificationService } from 'app/entities/notification/notification/notification.service';
import { Notification } from 'app/shared/model/notification/notification.model';

describe('Component Tests', () => {
  describe('Notification Management Update Component', () => {
    let comp: NotificationUpdateComponent;
    let fixture: ComponentFixture<NotificationUpdateComponent>;
    let service: NotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [NotificationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NotificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotificationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Notification(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Notification();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
