import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  ShipmentComponentsPage,
  /* ShipmentDeleteDialog,
   */ ShipmentUpdatePage
} from './shipment.page-object';

const expect = chai.expect;

describe('Shipment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shipmentComponentsPage: ShipmentComponentsPage;
  let shipmentUpdatePage: ShipmentUpdatePage;
  /* let shipmentDeleteDialog: ShipmentDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Shipments', async () => {
    await navBarPage.goToEntity('shipment');
    shipmentComponentsPage = new ShipmentComponentsPage();
    await browser.wait(ec.visibilityOf(shipmentComponentsPage.title), 5000);
    expect(await shipmentComponentsPage.getTitle()).to.eq('storeApp.invoiceShipment.home.title');
  });

  it('should load create Shipment page', async () => {
    await shipmentComponentsPage.clickOnCreateButton();
    shipmentUpdatePage = new ShipmentUpdatePage();
    expect(await shipmentUpdatePage.getPageTitle()).to.eq('storeApp.invoiceShipment.home.createOrEditLabel');
    await shipmentUpdatePage.cancel();
  });

  /*  it('should create and save Shipments', async () => {
        const nbButtonsBeforeCreate = await shipmentComponentsPage.countDeleteButtons();

        await shipmentComponentsPage.clickOnCreateButton();
        await promise.all([
            shipmentUpdatePage.setTrackingCodeInput('trackingCode'),
            shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            shipmentUpdatePage.setDetailsInput('details'),
            shipmentUpdatePage.invoiceSelectLastOption(),
        ]);
        expect(await shipmentUpdatePage.getTrackingCodeInput()).to.eq('trackingCode', 'Expected TrackingCode value to be equals to trackingCode');
        expect(await shipmentUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
        expect(await shipmentUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
        await shipmentUpdatePage.save();
        expect(await shipmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Shipment', async () => {
        const nbButtonsBeforeDelete = await shipmentComponentsPage.countDeleteButtons();
        await shipmentComponentsPage.clickOnLastDeleteButton();

        shipmentDeleteDialog = new ShipmentDeleteDialog();
        expect(await shipmentDeleteDialog.getDialogTitle())
            .to.eq('storeApp.invoiceShipment.delete.question');
        await shipmentDeleteDialog.clickOnConfirmButton();

        expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
