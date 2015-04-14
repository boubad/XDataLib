//home.ts
/// <reference path='../../../typings/knockout/knockout.d.ts'/>
/// <reference path='../../../typings/durandal/durandal.d.ts'/>
//
import InfoData = require('../../infodata');
import ko = require('knockout');
import UserInfo = require('../data/model/userinfo');
import BaseViewModel = require('../data/model/baseviewmodel');
import dataService = require('../data/services/dataservice');
import MenuDesc = require('../data/domain/menudesc');
import shell = require('./shell');
import app = require('durandal/app');
//
var router = shell.router;
//
declare var window: any;
//
class HomeClass extends BaseViewModel {
  //
  public username:KnockoutObservable<string>;
  public password:KnockoutObservable<string>;
  //
  public canConnect:KnockoutComputed<boolean>;
  //
  constructor(){
    super();
    this.username = ko.observable(null);
    this.password = ko.observable(null);
    //
    this.canConnect = ko.computed(()=>{
      var x1 = this.username();
      var x2 = this.password();
      return ((x1 !== null) && (x1.trim().length > 0)) && (x2 !== null) &&
      (x2.trim().length > 0);
    },this);
  }// constructor
  public connect() : any {
    var self = this;
    var suser = this.username();
    var spass = this.password();
    var userinfo = this.userInfo;
    userinfo.person = null;
    this.fullname(null);
    this.photoUrl(null);
    dataService.find_person_by_username(suser).then((p:InfoData.IPerson) =>{
      if ((p !== undefined) && (p !== null)){
         userinfo.person = p;
         self.fullname(p.fullname);
         self.isConnected(true);
         self.isAdmin(p.is_admin);
         self.update_menu();
         var id = p.id;
         var avatarid = p.avatarid;
         if ((id !== null) && (avatarid !== null)){
            dataService.get_docid_attachment(id,avatarid).then((data)=>{
              if ((data !== undefined) && (data !== null)){
                var x = window.URL.createObjectURL(data);
                self.photoUrl(x);
              }
            });
         }// id
      }// ok
    });
  }// connect
  public disconnect() : any {
     return app.showMessage('Voulez-vous vraiment quitter?','InfoApp',['Oui','Non']).then((r)=>{
      if (r == 'Oui'){
        this.username(null);
    this.password(null);
    return super.disconnect();
      }
      });
  }
  public update_menu(): any {
    var mm:InfoData.IMenuDesc[] = [];
    if (this.isConnected()){
      mm.push(new MenuDesc('profil','Profil','images/profil.jpg'));
      if (this.isAdmin()){
        mm.push(new MenuDesc('administration','Administration','images/administration.png'));
      }
      mm.push(new MenuDesc('disconnect','Déconnecter','images/disconnect.jpg',
        this,(p:HomeClass) => {
           p.disconnect();
          }));
    }
    this.menu(mm);
  }// update_menu
}// class HomeClass
var home = new HomeClass();
export = home;
