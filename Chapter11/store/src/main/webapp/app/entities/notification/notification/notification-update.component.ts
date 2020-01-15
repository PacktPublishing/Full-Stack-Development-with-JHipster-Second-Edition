import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { INotification, Notification } from 'app/shared/model/notification/notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    details: [],
    sentDate: [null, [Validators.required]],
    format: [null, [Validators.required]],
    userId: [null, [Validators.required]],
    productId: [null, [Validators.required]]
  });

  constructor(protected notificationService: NotificationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.updateForm(notification);
    });
  }

  updateForm(notification: INotification) {
    this.editForm.patchValue({
      id: notification.id,
      date: notification.date != null ? notification.date.format(DATE_TIME_FORMAT) : null,
      details: notification.details,
      sentDate: notification.sentDate != null ? notification.sentDate.format(DATE_TIME_FORMAT) : null,
      format: notification.format,
      userId: notification.userId,
      productId: notification.productId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details']).value,
      sentDate: this.editForm.get(['sentDate']).value != null ? moment(this.editForm.get(['sentDate']).value, DATE_TIME_FORMAT) : undefined,
      format: this.editForm.get(['format']).value,
      userId: this.editForm.get(['userId']).value,
      productId: this.editForm.get(['productId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
