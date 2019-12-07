import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CustomerComponentsPage, CustomerUpdatePage, CustomerDeleteDialog } from './customer.page-object';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerComponentsPage: CustomerComponentsPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerDeleteDialog: CustomerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Customers', async () => {
    await navBarPage.goToEntity('customer');
    customerComponentsPage = new CustomerComponentsPage();
    await browser.wait(ec.visibilityOf(customerComponentsPage.title), 5000);
    expect(await customerComponentsPage.getTitle()).to.eq('storeApp.customer.home.title');
  });

  it('should load create Customer page', async () => {
    await customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle()).to.eq('storeApp.customer.home.createOrEditLabel');
    await customerUpdatePage.cancel();
  });

  it('should create and save Customers', async () => {
    const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();

    await customerComponentsPage.clickOnCreateButton();
    await promise.all([
      customerUpdatePage.setFirstNameInput('firstName'),
      customerUpdatePage.setLastNameInput('lastName'),
      customerUpdatePage.genderSelectLastOption(),
      customerUpdatePage.setEmailInput('test@test.com'),
      customerUpdatePage.setPhoneInput('phone'),
      customerUpdatePage.setAddressLine1Input('addressLine1'),
      customerUpdatePage.setAddressLine2Input('addressLine2'),
      customerUpdatePage.setCityInput('city'),
      customerUpdatePage.setCountryInput('country'),
      customerUpdatePage.userSelectLastOption()
    ]);
    expect(await customerUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await customerUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await customerUpdatePage.getEmailInput()).to.eq('test@test.com');
    expect(await customerUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await customerUpdatePage.getAddressLine1Input()).to.eq(
      'addressLine1',
      'Expected AddressLine1 value to be equals to addressLine1'
    );
    expect(await customerUpdatePage.getAddressLine2Input()).to.eq(
      'addressLine2',
      'Expected AddressLine2 value to be equals to addressLine2'
    );
    expect(await customerUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await customerUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    await customerUpdatePage.save();
    expect(await customerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Customer', async () => {
    const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
    await customerComponentsPage.clickOnLastDeleteButton();

    customerDeleteDialog = new CustomerDeleteDialog();
    expect(await customerDeleteDialog.getDialogTitle()).to.eq('storeApp.customer.delete.question');
    await customerDeleteDialog.clickOnConfirmButton();

    expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
