//baseviewmodel.ts
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
//
import InfoData = require('../../../infodata');
import ko = require('knockout');
import UserInfo = require('./userinfo');
//
class BaseViewModel {
  //
  public menu:KnockoutObservableArray<InfoData.IMenuDesc>;
  //
  public _info:UserInfo;
  //
   constructor(){
      this._info = new UserInfo();
      this.menu = ko.observableArray([]);
   }// constructor
   public get userInfo(): UserInfo {
     if ((this._info === undefined) || (this._info === null)){
       this._info = new UserInfo();
     }
     return this._info;
   }
   public update_menu(): any {
   }// update_menu
   public activate() : any {
     this.update_menu();
     return true;
   }// activate
}// class BaseViewModel
export = BaseViewModel;
