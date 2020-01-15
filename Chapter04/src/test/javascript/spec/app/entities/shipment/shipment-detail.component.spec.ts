import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { ShipmentDetailComponent } from 'app/entities/shipment/shipment-detail.component';
import { Shipment } from 'app/shared/model/shipment.model';

describe('Component Tests', () => {
  describe('Shipment Management Detail Component', () => {
    let comp: ShipmentDetailComponent;
    let fixture: ComponentFixture<ShipmentDetailComponent>;
    const route = ({ data: of({ shipment: new Shipment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ShipmentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShipmentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShipmentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shipment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
