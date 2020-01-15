import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductCategoryComponentsPage, ProductCategoryDeleteDialog, ProductCategoryUpdatePage } from './product-category.page-object';

const expect = chai.expect;

describe('ProductCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productCategoryComponentsPage: ProductCategoryComponentsPage;
  let productCategoryUpdatePage: ProductCategoryUpdatePage;
  let productCategoryDeleteDialog: ProductCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductCategories', async () => {
    await navBarPage.goToEntity('product-category');
    productCategoryComponentsPage = new ProductCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(productCategoryComponentsPage.title), 5000);
    expect(await productCategoryComponentsPage.getTitle()).to.eq('storeApp.productCategory.home.title');
  });

  it('should load create ProductCategory page', async () => {
    await productCategoryComponentsPage.clickOnCreateButton();
    productCategoryUpdatePage = new ProductCategoryUpdatePage();
    expect(await productCategoryUpdatePage.getPageTitle()).to.eq('storeApp.productCategory.home.createOrEditLabel');
    await productCategoryUpdatePage.cancel();
  });

  it('should create and save ProductCategories', async () => {
    const nbButtonsBeforeCreate = await productCategoryComponentsPage.countDeleteButtons();

    await productCategoryComponentsPage.clickOnCreateButton();
    await promise.all([productCategoryUpdatePage.setNameInput('name'), productCategoryUpdatePage.setDescriptionInput('description')]);
    expect(await productCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await productCategoryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await productCategoryUpdatePage.save();
    expect(await productCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProductCategory', async () => {
    const nbButtonsBeforeDelete = await productCategoryComponentsPage.countDeleteButtons();
    await productCategoryComponentsPage.clickOnLastDeleteButton();

    productCategoryDeleteDialog = new ProductCategoryDeleteDialog();
    expect(await productCategoryDeleteDialog.getDialogTitle()).to.eq('storeApp.productCategory.delete.question');
    await productCategoryDeleteDialog.clickOnConfirmButton();

    expect(await productCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
