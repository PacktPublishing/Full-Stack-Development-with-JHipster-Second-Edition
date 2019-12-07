import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderItem, OrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from 'app/entities/product-order/product-order.service';

@Component({
  selector: 'jhi-order-item-update',
  templateUrl: './order-item-update.component.html'
})
export class OrderItemUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  productorders: IProductOrder[];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    totalPrice: [null, [Validators.required, Validators.min(0)]],
    status: [null, [Validators.required]],
    product: [null, Validators.required],
    order: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderItemService: OrderItemService,
    protected productService: ProductService,
    protected productOrderService: ProductOrderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderItem }) => {
      this.updateForm(orderItem);
    });
    this.productService
      .query()
      .subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.productOrderService
      .query()
      .subscribe(
        (res: HttpResponse<IProductOrder[]>) => (this.productorders = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(orderItem: IOrderItem) {
    this.editForm.patchValue({
      id: orderItem.id,
      quantity: orderItem.quantity,
      totalPrice: orderItem.totalPrice,
      status: orderItem.status,
      product: orderItem.product,
      order: orderItem.order
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderItem = this.createFromForm();
    if (orderItem.id !== undefined) {
      this.subscribeToSaveResponse(this.orderItemService.update(orderItem));
    } else {
      this.subscribeToSaveResponse(this.orderItemService.create(orderItem));
    }
  }

  private createFromForm(): IOrderItem {
    return {
      ...new OrderItem(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      totalPrice: this.editForm.get(['totalPrice']).value,
      status: this.editForm.get(['status']).value,
      product: this.editForm.get(['product']).value,
      order: this.editForm.get(['order']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>) {
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

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackProductOrderById(index: number, item: IProductOrder) {
    return item.id;
  }
}
