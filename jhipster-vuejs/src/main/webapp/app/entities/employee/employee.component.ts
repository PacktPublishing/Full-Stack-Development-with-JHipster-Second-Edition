import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEmployee } from '@/shared/model/employee.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EmployeeService from './employee.service';

@Component
export default class Employee extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('employeeService') private employeeService: () => EmployeeService;
  private removeId: number = null;
  public employees: IEmployee[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEmployees();
  }

  public clear(): void {
    this.retrieveAllEmployees();
  }

  public retrieveAllEmployees(): void {
    this.isFetching = true;

    this.employeeService()
      .retrieve()
      .then(
        res => {
          this.employees = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEmployee): void {
    this.removeId = instance.id;
  }

  public removeEmployee(): void {
    this.employeeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhvueApp.employee.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllEmployees();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
