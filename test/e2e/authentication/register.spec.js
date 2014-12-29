'use strict';

var //cp        = require('child_process'),
h         = require('../../helpers/helpers');
//db        = h.getdb();

describe('register', function(){
  //beforeEach(function(done){
    //cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      //browser.get('/#/register');
      //done();
    //});
    beforeEach(function(){
      browser.get('/#/register');
  });

  it('should get regiser page', function(){
    expect(browser.getTitle()).toEqual('NoteTaker');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
    });

    it('should register a new user', function(){
      element(by.model('user.username')).sendKeys('bin'+ h.random(5000));
      element(by.model('user.password')).sendKeys('1234');
      element(by.model('user.avatar')).sendKeys('http://images.apple.com/global/elements/flags/16x16/usa_2x.png');
      element(by.css('button[ng-click=\'submit()\']')).click();
      expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
    });
});
