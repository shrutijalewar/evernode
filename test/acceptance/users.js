/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
    cp        = require('child_process'),
    server    = require('../../server/index'),
    h         = require('../helpers/helpers'),
    Lab       = require('lab'),
    lab       = exports.lab = Lab.script(),
    describe  = lab.describe,
    it        = lab.it,
    db        = h.getdb(),
    beforeEach= lab.beforeEach;

describe('User', function(){
  var cookie;

  beforeEach(function(done){

    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123'
        }
      };
      server.inject(options,function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        //console.log(cookie);
        done();
      });
    });
  });

  /*describe('post/register', function(){
    it('should register a new user', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          username: 'sam',
          password: '123',
          avatar: 'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'
        }
      };

      server.inject(options,function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });*/
  describe('post/login', function(){
    it('should login a user', function(done){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123'
        }
      };
      server.inject(options,function(response){
        //console.log(response);
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('bob');
        done();
      });
    });
  });
  describe('delete/logout', function(){
    it('should login a user', function(done){
      var options = {
        method: 'delete',
        url: '/logout',
        headers: {
          cookie:cookie
        }
      };
      server.inject(options,function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('get/status', function(){
    it('should get status of a user', function(done){
      var options = {
        method: 'get',
        url: '/status',
        headers: {
          cookie:cookie
        }
      };
      server.inject(options,function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});// last
