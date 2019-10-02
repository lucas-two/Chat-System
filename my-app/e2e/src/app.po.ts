import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('Home')).getText() as Promise<string>;
  }

  getNavLoginBtn() {
    return element(by.css('[ng-reflect-router-link="/login"]'));
  }

  getLoginTitleText() {
    return element(by.css('.card-title')).getText() as Promise<string>;
  }

  getEmailInput() {
    return element(by.css('input[type="email"]'));
  }

  getPwdInput() {
    return element(by.css('input[type="password"]'));
  }

  getLoginBtn() {
    return element(by.css('button'));
  }

  getDashboardtitle() {
    return element(by.css('h1')).getText();
  }

  getGroupInviteToBtn() {
    return element(by.id('groupInviteTo'));
  }

}
