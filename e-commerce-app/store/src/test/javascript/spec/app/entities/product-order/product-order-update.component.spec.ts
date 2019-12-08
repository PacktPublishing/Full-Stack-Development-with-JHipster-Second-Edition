import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { ProductOrderUpdateComponent } from 'app/entities/product-order/product-order-update.component';
import { ProductOrderService } from 'app/entities/product-order/product-order.service';
import { ProductOrder } from 'app/shared/model/product-order.model';

describe('Component Tests', () => {
  describe('ProductOrder Management Update Component', () => {
    let comp: ProductOrderUpdateComponent;
    let fixture: ComponentFixture<ProductOrderUpdateComponent>;
    let service: ProductOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductOrderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOrderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOrderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductOrder(123);
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
        const entity = new ProductOrder();
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
