import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display home page welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome home!');
  });

  it('should display login nav bar button', () => {
    page.navigateTo();
    expect(page.getNavLoginBtn().getText()).toEqual('Sign in');
  });

  it('should route to login page', () => {
    page.navigateTo();
    page.getNavLoginBtn().click();
    expect(page.getLoginTitleText()).toEqual('Sign in');
  });

  it('should be able to login', () => {
    page.navigateTo();
    page.getNavLoginBtn().click();
    page.getEmailInput().sendKeys('a@mail.com');
    page.getPwdInput().sendKeys('123');
    page.getLoginBtn().click();
    browser.waitForAngular();
    page.getGroupInviteToBtn().click();
  });



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
