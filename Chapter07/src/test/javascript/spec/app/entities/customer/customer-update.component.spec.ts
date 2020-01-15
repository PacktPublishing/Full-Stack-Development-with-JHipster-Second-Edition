import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { CustomerUpdateComponent } from 'app/entities/customer/customer-update.component';
import { CustomerService } from 'app/entities/customer/customer.service';
import { Customer } from 'app/shared/model/customer.model';

describe('Component Tests', () => {
  describe('Customer Management Update Component', () => {
    let comp: CustomerUpdateComponent;
    let fixture: ComponentFixture<CustomerUpdateComponent>;
    let service: CustomerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [CustomerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CustomerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Customer(123);
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
        const entity = new Customer();
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
