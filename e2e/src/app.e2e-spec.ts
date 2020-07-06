import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo().then(_ => {
      console.log(element(by.css(('.bonus-panel h1'))));
      expect(element(by.css('.bonus-panel h1')).getText()).toContain('Gemix');
    });

  });

  xit('should show bonus confirmation',  () => {
    const claimBtn = element(by.css('.bonus-panel button'));
    claimBtn.click();
    browser.waitForAngular();

    expect(page.getBonusInfo()).toContain('Gemix');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
