/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EmployeeDetailComponent from '@/entities/employee/employee-details.vue';
import EmployeeClass from '@/entities/employee/employee-details.component';
import EmployeeService from '@/entities/employee/employee.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Employee Management Detail Component', () => {
    let wrapper: Wrapper<EmployeeClass>;
    let comp: EmployeeClass;
    let employeeServiceStub: SinonStubbedInstance<EmployeeService>;

    beforeEach(() => {
      employeeServiceStub = sinon.createStubInstance<EmployeeService>(EmployeeService);

      wrapper = shallowMount<EmployeeClass>(EmployeeDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { employeeService: () => employeeServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEmployee = { id: 123 };
        employeeServiceStub.find.resolves(foundEmployee);

        // WHEN
        comp.retrieveEmployee(123);
        await comp.$nextTick();

        // THEN
        expect(comp.employee).toBe(foundEmployee);
      });
    });
  });
});
