/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EmployeeComponent from '@/entities/employee/employee.vue';
import EmployeeClass from '@/entities/employee/employee.component';
import EmployeeService from '@/entities/employee/employee.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Employee Management Component', () => {
    let wrapper: Wrapper<EmployeeClass>;
    let comp: EmployeeClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeService>(EmployeeService);
      employeeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EmployeeClass>(EmployeeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          employeeService: () => employeeServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      employeeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEmployees();
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      employeeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEmployee();
      await comp.$nextTick();

      // THEN
      expect(employeeServiceStub.delete.called).toBeTruthy();
      expect(employeeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
