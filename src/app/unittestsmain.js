"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit/qunit-1.17.1',
        'bluebird': '../lib/bluebird/bluebird.min',
        'pouchdb':'../lib/pouchdb/pouchdb-3.3.1.min',
        'domain':'./data/domain',
        'services': './data/services',
        'test-domain':'../test/data/domain',
        'test-services':'../test/data/services'
    },
    shim: {
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
    ['bluebird','pouchdb','QUnit','test-services/pouchdb/pouchdatabase-test'],
    function(Promise,PouchDB,QUnit, mytest) {
        PouchDB.debug.enable('*');
        // run the tests.
        //dummyTest.run();
        mytest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
