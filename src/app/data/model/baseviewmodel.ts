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
  public fullname:KnockoutObservable<string>;
  public photoUrl:KnockoutObservable<string>;
  public isConnected:KnockoutObservable<boolean>;
  public isAdmin:KnockoutObservable<boolean>;
  //
  public hasPhoto:KnockoutComputed<boolean>;
  //
   constructor(){
      this._info = new UserInfo();
      this.menu = ko.observableArray([]);
      this.fullname = ko.observable(null);
      this.photoUrl = ko.observable(null);
      this.isConnected = ko.observable(false);
      this.isAdmin = ko.observable(false);
      this.hasPhoto = ko.computed(()=>{
        var x = this.photoUrl();
        return (x !== null);
      },this);
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
