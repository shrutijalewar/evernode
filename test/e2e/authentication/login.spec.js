'use strict';

/*var cp        = require('child_process'),
h         = require('../../helpers/helpers'),
db        = h.getdb();
*/
describe('login', function(){
  /*beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      browser.get('/#/login');
      done();
    });*/
    beforeEach(function(){
      browser.get('/#/login');
  });

  it('should get login page', function(){
    expect(browser.getTitle()).toEqual('NoteTaker');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

  it('should login an user', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123');
    element(by.css('button[ng-click=\'submit()\']')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });

  it('should not login a user with wrong pwd', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click=\'submit()\']')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
});
