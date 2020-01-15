import { element, by, ElementFinder } from 'protractor';

export class NotificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-notification div table .btn-danger'));
  title = element.all(by.css('jhi-notification div h2#page-heading span')).first();

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

export class NotificationUpdatePage {
  pageTitle = element(by.id('jhi-notification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  detailsInput = element(by.id('field_details'));
  sentDateInput = element(by.id('field_sentDate'));
  formatSelect = element(by.id('field_format'));
  userIdInput = element(by.id('field_userId'));
  productIdInput = element(by.id('field_productId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async setSentDateInput(sentDate) {
    await this.sentDateInput.sendKeys(sentDate);
  }

  async getSentDateInput() {
    return await this.sentDateInput.getAttribute('value');
  }

  async setFormatSelect(format) {
    await this.formatSelect.sendKeys(format);
  }

  async getFormatSelect() {
    return await this.formatSelect.element(by.css('option:checked')).getText();
  }

  async formatSelectLastOption() {
    await this.formatSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return await this.userIdInput.getAttribute('value');
  }

  async setProductIdInput(productId) {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput() {
    return await this.productIdInput.getAttribute('value');
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

export class NotificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-notification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-notification'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
