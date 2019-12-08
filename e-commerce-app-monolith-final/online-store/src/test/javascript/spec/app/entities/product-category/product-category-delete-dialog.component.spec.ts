import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { ProductCategoryDeleteDialogComponent } from 'app/entities/product-category/product-category-delete-dialog.component';
import { ProductCategoryService } from 'app/entities/product-category/product-category.service';

describe('Component Tests', () => {
  describe('ProductCategory Management Delete Component', () => {
    let comp: ProductCategoryDeleteDialogComponent;
    let fixture: ComponentFixture<ProductCategoryDeleteDialogComponent>;
    let service: ProductCategoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductCategoryDeleteDialogComponent]
      })
        .overrideTemplate(ProductCategoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCategoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductCategoryService);
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
