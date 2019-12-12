import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class EmployeeUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('jhvueApp.employee.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#employee-name'));

  ageInput: ElementFinder = element(by.css('input#employee-age'));

  dobInput: ElementFinder = element(by.css('input#employee-dob'));

  userSelect = element(by.css('select#employee-user'));
}
