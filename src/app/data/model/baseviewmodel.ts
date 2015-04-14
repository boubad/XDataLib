//baseviewmodel.ts
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
/// <reference path="../../../../typings/durandal/durandal.d.ts"/>
//
import InfoData = require('../../../infodata');
import ko = require('knockout');
import UserInfo = require('./userinfo');
import shell = require('../../viewmodels/shell');
//
var router = shell.router;
//
class BaseViewModel {
  //
  public title:KnockoutObservable<string>;
  public errorMessage:KnockoutObservable<string>;
  public infoMessage:KnockoutObservable<string>;
  public hasInfoMessage:KnockoutComputed<boolean>;
  public hasErrorMessage:KnockoutComputed<boolean>;
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
      this.title = ko.observable(null);
      this.errorMessage = ko.observable(null);
      this.infoMessage = ko.observable(null);
      this.fullname = ko.observable(null);
      this.photoUrl = ko.observable(null);
      this.isConnected = ko.observable(false);
      this.isAdmin = ko.observable(false);
      //
      this.hasErrorMessage = ko.computed(()=>{
        var x = this.errorMessage();
        return ((x !== null) && (x.trim().length > 0));
        },this);
      this.hasInfoMessage = ko.computed(()=>{
        var x = this.infoMessage();
        return ((x !== null) && (x.trim().length > 0));
        },this);
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
   public navigate(dest:string) : any {
      if ((router !== undefined) && (router !== null) &&
         (dest !== undefined) && (dest !== null)){
         return router.navigate('#'+dest);
      }
      return false;
    }// naligate
    public select_menu(item?:InfoData.IMenuDesc) : any {
      if ((item !== undefined) && (item !== null)){
        item.execute();
      } 
      }// select_menu
      public disconnect() : any {
          this._info.person = null;
          this.fullname(null);
          this.photoUrl(null);
          this.isAdmin(false);
          this.isConnected(false);
          return true;
        }// disconnect
        public clear_error(): void {
          this.errorMessage(null);
          this.infoMessage(null);
          }// clear_error
        public set_error(err?:any){
          if ((err !== undefined) && (err !== null)){
             if ((err.message !== undefined) && (err.message !== null)){
              this.errorMessage(err.message);
             } else if ((err.msg !== undefined) && (err.msg !== null)){
              this.errorMessage(err.msg);
             } else if ((err.reason !== undefined) && (err.reason !== null)){
              this.errorMessage(err.reason);
             } else {
              this.errorMessage(JSON.stringify(err));
             }
            } else {
              this.errorMessage(null);
            }
          }// set_error
}// class BaseViewModel
export = BaseViewModel;
