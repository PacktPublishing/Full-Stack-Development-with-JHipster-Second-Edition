import { element, by, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invoice div table .btn-danger'));
  title = element.all(by.css('jhi-invoice div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class InvoiceUpdatePage {
  pageTitle = element(by.id('jhi-invoice-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  dateInput = element(by.id('field_date'));
  detailsInput = element(by.id('field_details'));
  statusSelect = element(by.id('field_status'));
  paymentMethodSelect = element(by.id('field_paymentMethod'));
  paymentDateInput = element(by.id('field_paymentDate'));
  paymentAmountInput = element(by.id('field_paymentAmount'));
  orderSelect = element(by.id('field_order'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return await this.detailsInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPaymentMethodSelect(paymentMethod) {
    await this.paymentMethodSelect.sendKeys(paymentMethod);
  }

  async getPaymentMethodSelect() {
    return await this.paymentMethodSelect.element(by.css('option:checked')).getText();
  }

  async paymentMethodSelectLastOption() {
    await this.paymentMethodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPaymentDateInput(paymentDate) {
    await this.paymentDateInput.sendKeys(paymentDate);
  }

  async getPaymentDateInput() {
    return await this.paymentDateInput.getAttribute('value');
  }

  async setPaymentAmountInput(paymentAmount) {
    await this.paymentAmountInput.sendKeys(paymentAmount);
  }

  async getPaymentAmountInput() {
    return await this.paymentAmountInput.getAttribute('value');
  }

  async orderSelectLastOption() {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option) {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption() {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InvoiceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invoice-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invoice'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
