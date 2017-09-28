import { WeatherAngularWidgetPage } from './app.po';

describe('weather-angular-widget App', () => {
  let page: WeatherAngularWidgetPage;

  beforeEach(() => {
    page = new WeatherAngularWidgetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
