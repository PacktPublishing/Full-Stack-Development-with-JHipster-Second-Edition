import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IProductOrder, ProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-product-order-update',
  templateUrl: './product-order-update.component.html'
})
export class ProductOrderUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomer[];

  editForm = this.fb.group({
    id: [],
    placedDate: [null, [Validators.required]],
    status: [null, [Validators.required]],
    code: [null, [Validators.required]],
    customer: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productOrderService: ProductOrderService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productOrder }) => {
      this.updateForm(productOrder);
    });
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productOrder: IProductOrder) {
    this.editForm.patchValue({
      id: productOrder.id,
      placedDate: productOrder.placedDate != null ? productOrder.placedDate.format(DATE_TIME_FORMAT) : null,
      status: productOrder.status,
      code: productOrder.code,
      customer: productOrder.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productOrder = this.createFromForm();
    if (productOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.productOrderService.update(productOrder));
    } else {
      this.subscribeToSaveResponse(this.productOrderService.create(productOrder));
    }
  }

  private createFromForm(): IProductOrder {
    return {
      ...new ProductOrder(),
      id: this.editForm.get(['id']).value,
      placedDate:
        this.editForm.get(['placedDate']).value != null ? moment(this.editForm.get(['placedDate']).value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status']).value,
      code: this.editForm.get(['code']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
