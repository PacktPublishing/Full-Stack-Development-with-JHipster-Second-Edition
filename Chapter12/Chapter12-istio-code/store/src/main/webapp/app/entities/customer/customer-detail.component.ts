import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomer } from 'app/shared/model/customer.model';

@Component({
  selector: 'jhi-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {
  customer: ICustomer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
    });
  }

  previousState() {
    window.history.back();
  }
}
