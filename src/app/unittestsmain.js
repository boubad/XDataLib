"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit/qunit-1.17.1',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'q': '../lib/q/q',
        'pouchdb':'../lib/pouchdb/pouchdb-3.3.1.min',
        'domain':'./data/domain',
        'test-domain':'../test/data/domain'
    },
    shim: {
       'q': {
         exports: 'Q'
       },
       'pouchdb':{
         exports: 'PouchDB'
       },
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       }
    }
});
// require the unit tests.
require(
    ['q','pouchdb','QUnit','test-domain/baseitem-test'],
    function(Q,PouchDB,QUnit, mytest) {
        PouchDB.debug.enable('*');
        // run the tests.
        //dummyTest.run();
        mytest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
