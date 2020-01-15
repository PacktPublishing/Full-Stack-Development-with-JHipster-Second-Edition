import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { NotificationComponentsPage, NotificationDeleteDialog, NotificationUpdatePage } from './notification.page-object';

const expect = chai.expect;

describe('Notification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let notificationComponentsPage: NotificationComponentsPage;
  let notificationUpdatePage: NotificationUpdatePage;
  let notificationDeleteDialog: NotificationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Notifications', async () => {
    await navBarPage.goToEntity('notification');
    notificationComponentsPage = new NotificationComponentsPage();
    await browser.wait(ec.visibilityOf(notificationComponentsPage.title), 5000);
    expect(await notificationComponentsPage.getTitle()).to.eq('storeApp.notificationNotification.home.title');
  });

  it('should load create Notification page', async () => {
    await notificationComponentsPage.clickOnCreateButton();
    notificationUpdatePage = new NotificationUpdatePage();
    expect(await notificationUpdatePage.getPageTitle()).to.eq('storeApp.notificationNotification.home.createOrEditLabel');
    await notificationUpdatePage.cancel();
  });

  it('should create and save Notifications', async () => {
    const nbButtonsBeforeCreate = await notificationComponentsPage.countDeleteButtons();

    await notificationComponentsPage.clickOnCreateButton();
    await promise.all([
      notificationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      notificationUpdatePage.setDetailsInput('details'),
      notificationUpdatePage.setSentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      notificationUpdatePage.formatSelectLastOption(),
      notificationUpdatePage.setUserIdInput('5'),
      notificationUpdatePage.setProductIdInput('5')
    ]);
    expect(await notificationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await notificationUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
    expect(await notificationUpdatePage.getSentDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected sentDate value to be equals to 2000-12-31'
    );
    expect(await notificationUpdatePage.getUserIdInput()).to.eq('5', 'Expected userId value to be equals to 5');
    expect(await notificationUpdatePage.getProductIdInput()).to.eq('5', 'Expected productId value to be equals to 5');
    await notificationUpdatePage.save();
    expect(await notificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Notification', async () => {
    const nbButtonsBeforeDelete = await notificationComponentsPage.countDeleteButtons();
    await notificationComponentsPage.clickOnLastDeleteButton();

    notificationDeleteDialog = new NotificationDeleteDialog();
    expect(await notificationDeleteDialog.getDialogTitle()).to.eq('storeApp.notificationNotification.delete.question');
    await notificationDeleteDialog.clickOnConfirmButton();

    expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
