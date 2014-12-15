/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
cp        = require('child_process'),
User      = require('../../server/models/user'),
h         = require('../helpers/helpers'),
Lab       = require('lab'),
lab       = exports.lab = Lab.script(),
describe  = lab.describe,
it        = lab.it,
//before    = lab.before,
db        = h.getdb(),
beforeEach= lab.beforeEach;

describe('User', function(){

  beforeEach(function(done){

    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(err, stdout, stderr);
      done();
    });
  });
  describe('constructor', function(){
    it('create a user object', function(done){
      var user = new User({username:'bill'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bill');
      done();
    });
  });
  describe('.register', function(){
    it('register a new user', function(done){
      User.register({username:'sam', password:'1234', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT register a new User - duplicate', function(done){
      User.register({username:'bob', password:'123', avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
        expect(err).to.be.ok;
        done();
      });
    });
  });
  describe('.login', function(){
    it('login a user', function(done){
      User.login({username:'bob', password:'123'},function(user){
        console.log(user);
        expect(user.username).to.equal('bob');
        done();
      });
    });
    it('should NOT login a User - bad username', function(done){
      User.login({username:'wrong', password:'123'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
    it('should NOT login a User - bad password', function(done){
      User.login({username:'bob', password:'wrong'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });


});// last
