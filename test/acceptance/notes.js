/* jshint expr:true */

'use strict';

var expect    = require('chai').expect,
cp        = require('child_process'),
server    = require('../../server/index'),
h         = require('../helpers/helpers'),
Note      = require('../../server/models/note'),
Lab       = require('lab'),
lab       = exports.lab = Lab.script(),
describe  = lab.describe,
it        = lab.it,
db        = h.getdb(),
beforeEach= lab.beforeEach;

describe('Note', function(){
  var cookie, noteId;

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
      Note.create({id:1}, {title: 'dim', body: 'blah, blah', tags:'a,b,c'},function(err, results){
        noteId = results;
        console.log('>>>>>>>>>>>>>',noteId);
        done();
      });
    });
  });
});
  describe('post/notes', function(){
    it('should post a new note for a new user', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        headers: {
          cookie:cookie
        },
        payload: {
          title: 'doubleQ',
          body: 'LookItUp',
          tags: '1,2'
        }
      };
      server.inject(options,function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('get/notes', function(){
    it('should get notes for a user', function(done){
      var options = {
        method: 'get',
        url: '/notes',
        headers: {
          cookie:cookie
        },
        query: {
          limit: '',
          offset: '',
          tag: ''
        }
      };
      server.inject(options,function(response){
        //console.log(response.result.notes);
        expect(response.statusCode).to.equal(200);
        expect(response.result.notes[0].title).to.equal('dim');
        expect(response.result.notes[0].body).to.equal('blah, blah');
        done();
      });
    });
  });
  describe('get/notes/12', function(){
    it('should get a note', function(done){
      var options = {
        method: 'get',
        url: '/notes/' + noteId,
        headers: {
          cookie:cookie
        }
      };
      server.inject(options,function(response){
        //console.log(response);
        expect(response.statusCode).to.equal(200);
        expect(response.result.title).to.equal('dim');
        expect(response.result.body).to.equal('blah, blah');
        done();
      });
    });
  });
  describe('get/notes/count', function(){
    it('should get a note count', function(done){
      var options = {
        method: 'get',
        url: '/notes/count',
        headers: {
          cookie:cookie
        }
      };
      server.inject(options,function(response){
        console.log(response);
        expect(response.statusCode).to.equal(200);
        expect(response.result.count).to.equal('1');
        done();
      });
    });
  });
  describe('delete/notes/12', function(){
    it('should get a note', function(done){
      var options = {
        method: 'delete',
        url: '/notes/' + noteId,
        headers: {
          cookie:cookie
        }
      };
      server.inject(options,function(response){
        //console.log(response);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('post/notes/12/upload', function(){
    it('should post a photo for a note', function(done){
      var options = {
        method: 'post',
        url: '/notes/' + noteId + '/upload',
        headers: {
          cookie:cookie
        },
        payload: {
          b64: 'ab64string'
        }
      };
      server.inject(options,function(response){
        //expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  /*describe('post /notes/3/upload-mobile', function(){
    it('should upload a mobile photo', function(done){
      var options = {
        method: 'post',
        url: '/notes/' + noteId + '/upload-mobile',
        headers:{
          cookie:cookie
        },
        payload:{
          b64: 'ab64string'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });*/
});// last
