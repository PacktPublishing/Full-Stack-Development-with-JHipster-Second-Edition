import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDeleteDialogComponent } from './product-category-delete-dialog.component';

@Component({
  selector: 'jhi-product-category',
  templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  productCategories: IProductCategory[];
  eventSubscriber: Subscription;

  constructor(
    protected productCategoryService: ProductCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => {
      this.productCategories = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProductCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductCategory) {
    return item.id;
  }

  registerChangeInProductCategories() {
    this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', () => this.loadAll());
  }

  delete(productCategory: IProductCategory) {
    const modalRef = this.modalService.open(ProductCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productCategory = productCategory;
  }
}
