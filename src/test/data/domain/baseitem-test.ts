//baseitem.test.ts
/// <reference path="../../../../typings/qunit/qunit.d.ts"/>
//
import BaseItem = require("../../../app/data/domain/baseitem");
//
var main = () =>{
  test ('BaseItem constructor tests',()=>{
     var data = new BaseItem({
       _id: 'testid',
       _rev: 'testrev',
       _attachments : {}
     });
     ok(true);
  });
}; // main
var run = {run: main};
export = run;
