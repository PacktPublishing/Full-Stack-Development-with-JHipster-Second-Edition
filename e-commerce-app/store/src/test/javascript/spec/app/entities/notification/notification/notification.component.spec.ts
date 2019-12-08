import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreTestModule } from '../../../../test.module';
import { NotificationComponent } from 'app/entities/notification/notification/notification.component';
import { NotificationService } from 'app/entities/notification/notification/notification.service';
import { Notification } from 'app/shared/model/notification/notification.model';

describe('Component Tests', () => {
  describe('Notification Management Component', () => {
    let comp: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let service: NotificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [NotificationComponent],
        providers: []
      })
        .overrideTemplate(NotificationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotificationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Notification(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.notifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
