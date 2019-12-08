import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { ProductCategoryUpdateComponent } from 'app/entities/product-category/product-category-update.component';
import { ProductCategoryService } from 'app/entities/product-category/product-category.service';
import { ProductCategory } from 'app/shared/model/product-category.model';

describe('Component Tests', () => {
  describe('ProductCategory Management Update Component', () => {
    let comp: ProductCategoryUpdateComponent;
    let fixture: ComponentFixture<ProductCategoryUpdateComponent>;
    let service: ProductCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductCategoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductCategory(123);
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
        const entity = new ProductCategory();
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
