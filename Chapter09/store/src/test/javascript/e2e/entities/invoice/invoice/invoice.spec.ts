import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { InvoiceComponentsPage, InvoiceDeleteDialog, InvoiceUpdatePage } from './invoice.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceDeleteDialog: InvoiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Invoices', async () => {
    await navBarPage.goToEntity('invoice');
    invoiceComponentsPage = new InvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
    expect(await invoiceComponentsPage.getTitle()).to.eq('storeApp.invoiceInvoice.home.title');
  });

  it('should load create Invoice page', async () => {
    await invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    expect(await invoiceUpdatePage.getPageTitle()).to.eq('storeApp.invoiceInvoice.home.createOrEditLabel');
    await invoiceUpdatePage.cancel();
  });

  it('should create and save Invoices', async () => {
    const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

    await invoiceComponentsPage.clickOnCreateButton();
    await promise.all([
      invoiceUpdatePage.setCodeInput('code'),
      invoiceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      invoiceUpdatePage.setDetailsInput('details'),
      invoiceUpdatePage.statusSelectLastOption(),
      invoiceUpdatePage.paymentMethodSelectLastOption(),
      invoiceUpdatePage.setPaymentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      invoiceUpdatePage.setPaymentAmountInput('5'),
      invoiceUpdatePage.setProductOrderIdInput('5')
    ]);
    expect(await invoiceUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await invoiceUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await invoiceUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
    expect(await invoiceUpdatePage.getPaymentDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected paymentDate value to be equals to 2000-12-31'
    );
    expect(await invoiceUpdatePage.getPaymentAmountInput()).to.eq('5', 'Expected paymentAmount value to be equals to 5');
    expect(await invoiceUpdatePage.getProductOrderIdInput()).to.eq('5', 'Expected productOrderId value to be equals to 5');
    await invoiceUpdatePage.save();
    expect(await invoiceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Invoice', async () => {
    const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
    await invoiceComponentsPage.clickOnLastDeleteButton();

    invoiceDeleteDialog = new InvoiceDeleteDialog();
    expect(await invoiceDeleteDialog.getDialogTitle()).to.eq('storeApp.invoiceInvoice.delete.question');
    await invoiceDeleteDialog.clickOnConfirmButton();

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
