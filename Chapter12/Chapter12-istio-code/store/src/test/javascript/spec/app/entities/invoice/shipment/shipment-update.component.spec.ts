import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../../test.module';
import { ShipmentUpdateComponent } from 'app/entities/invoice/shipment/shipment-update.component';
import { ShipmentService } from 'app/entities/invoice/shipment/shipment.service';
import { Shipment } from 'app/shared/model/invoice/shipment.model';

describe('Component Tests', () => {
  describe('Shipment Management Update Component', () => {
    let comp: ShipmentUpdateComponent;
    let fixture: ComponentFixture<ShipmentUpdateComponent>;
    let service: ShipmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ShipmentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShipmentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShipmentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipmentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Shipment(123);
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
        const entity = new Shipment();
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
