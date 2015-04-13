//pouchdatabase-test.ts
/// <reference path="../../../../../typings/qunit/qunit.d.ts"/>;
/// <reference path="../../../../../typings/pouchdb/pouchdb.d.ts"/>
/// <reference path="../../../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../../infodata.d.ts"/>
//
import PouchDatabase = require("../../../../app/data/services/pouchdb/maintainsdatabase");
//
var databaseUrl:string = 'http://localhost:5984/geninfo';
//
var main = () =>{
  test ('PouchDatabase constructor tests',(assert)=>{
    var done = assert.async();
     var data = new PouchDatabase();
     data.db.then((xdb)=>{
       ok((xdb !== undefined) && (xdb !== null),'Database opened');
       done();
     },(err)=>{
       if ((err !== undefined) && (err !== null)){
         console.log('Error: ' + JSON.stringify(err));
       }
       done();
     });
  });
  //
  test('PouchDatabase maintains_doc',(assert)=>{
    var done = assert.async();
    var doc = {_id: 'testDocID', data:'bla'};
    var data = new PouchDatabase();
    data.maintains_doc(doc).then((r)=>{
      ok((r !== undefined) && (r !== null));
      ok((r.ok !== undefined) && (r.ok !== null) && (r.ok == true));
      ok((r.id !== undefined) && (r.id !== null) && (r.id == 'testDocID'));
      ok((r.rev !== undefined) && (r.rev !== null));
      done();
    },(err)=>{
      if ((err !== undefined) && (err !== null)){
        console.log('Error: ' + JSON.stringify(err));
      }
      done();
    });
  });
}; // main
var run = {run: main};
export = run;
