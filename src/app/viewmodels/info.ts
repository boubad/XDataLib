//info.ts
import UserInfo = require('../data/model/userinfo');
import dataService = require('../data/services/dataservice');
//
class Info extends UserInfo {
  constructor(){
    super(dataService);
  }// constructor
  public update_menu(): any {
  }// update_menu
}// class Info
var userinfo = new Info();
export = userinfo;
