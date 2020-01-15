import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { ProductOrderDetailComponent } from 'app/entities/product-order/product-order-detail.component';
import { ProductOrder } from 'app/shared/model/product-order.model';

describe('Component Tests', () => {
  describe('ProductOrder Management Detail Component', () => {
    let comp: ProductOrderDetailComponent;
    let fixture: ComponentFixture<ProductOrderDetailComponent>;
    const route = ({ data: of({ productOrder: new ProductOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
