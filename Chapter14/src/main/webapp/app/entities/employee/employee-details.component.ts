import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEmployee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';

@Component
export default class EmployeeDetails extends Vue {
  @Inject('employeeService') private employeeService: () => EmployeeService;
  public employee: IEmployee = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
    });
  }

  public retrieveEmployee(employeeId) {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
