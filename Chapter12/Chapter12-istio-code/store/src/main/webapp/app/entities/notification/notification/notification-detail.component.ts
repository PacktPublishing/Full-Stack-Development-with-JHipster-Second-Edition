import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotification } from 'app/shared/model/notification/notification.model';

@Component({
  selector: 'jhi-notification-detail',
  templateUrl: './notification-detail.component.html'
})
export class NotificationDetailComponent implements OnInit {
  notification: INotification;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.notification = notification;
    });
  }

  previousState() {
    window.history.back();
  }
}
