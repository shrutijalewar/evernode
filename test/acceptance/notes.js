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

describe('Note', function(){
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
        console.log(cookie);
        done();
      });
    });
  });
