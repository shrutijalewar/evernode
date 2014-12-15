/* jshint expr:true */

'use strict';

var expect= require('chai').expect,
cp        = require('child_process'),
Note      = require('../../server/models/note'),
h         = require('../helpers/helpers'),
Lab       = require('lab'),
lab       = exports.lab = Lab.script(),
describe  = lab.describe,
it        = lab.it,
db        = h.getdb(),
fs         = require('fs'),
beforeEach= lab.beforeEach;

describe('Note', function(){
  var noteId;
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      Note.create({id:1}, {title: 'dim', body: 'blah, blah', tags:'a,b,c'},function(err, results){
        noteId = results;
        done();
      });
    });
  });
  describe('constructor', function(){
    it('should create a new note', function(done){
      var n = new Note();
      expect(n).to.be.instanceof(Note);
      done();
    });
  });
  describe('.upload', function(){
    it('should upload an image', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/flag.png');
      Note.upload({token:'tok'}, file, 'flag.png', noteId, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('.uploadmobile', function(){
    it('should upload a b64 encoded image', function(done){
      Note.uploadmobile({token:'tok'}, 'b64image', noteId, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a note', function(done){
      Note.create({id:1}, {title:'a',body:'b',tags:'c,d,e'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.above(0);
        done();
      });
    });
  });
  describe('.show', function(){
    it('should show a note', function(done){
      Note.show({id:1}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results.title).to.equal('dim');
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should nuke a note', function(done){
      Note.nuke({id:1}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal(noteId);
        done();
      });
    });
  });
  describe('.count', function(user, obj){
    it('should count the no of notes from a user', function(done){
      Note.count({id:1}, function(err, results){
        console.log(results);
        expect(err).to.be.null;
        expect(results).to.equal('1');
        done();
      });
    });
  });
  describe('.query', function(){
    it('should query notes from a user', function(done){
      Note.query({id:1}, {}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
  });
});//last
