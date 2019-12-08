import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCategory } from 'app/shared/model/product-category.model';

@Component({
  selector: 'jhi-product-category-detail',
  templateUrl: './product-category-detail.component.html'
})
export class ProductCategoryDetailComponent implements OnInit {
  productCategory: IProductCategory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productCategory }) => {
      this.productCategory = productCategory;
    });
  }

  previousState() {
    window.history.back();
  }
}
