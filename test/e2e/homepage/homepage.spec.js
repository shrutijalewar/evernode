'use strict';

describe('homepage', function(){
  it('it should get the home page', function(){
    browser.get('/');
    expect(browser.getTitle()).toEqual('NoteTaker');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });
});
