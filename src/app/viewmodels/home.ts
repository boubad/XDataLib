//home.ts
/// <reference path='../../../typings/knockout/knockout.d.ts'/>
/// <reference path='../../../typings/durandal/durandal.d.ts'/>
//
import InfoData = require('../../infodata');
import ko = require('knockout');
import UserInfo = require('../data/model/userinfo');
import BaseViewModel = require('../data/model/baseviewmodel');
import dataService = require('../data/services/dataservice');
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
  public select(item?:InfoData.IMenuDesc) : any {
    if ((item !== undefined) && (item !== null)){
       if ((item.action !== undefined) && (item.action !== null)){
          var action:string = item.action;
          if (action == 'disconnect'){
            app.showMessage('Voulez-vous vraiment quitter?',
            'InfoApp', ['Oui', 'Non']).then((r)=>{
              if (r == 'Oui'){
                var pp = item.parent;
                var userinfo = pp.userInfo;
                userinfo.person = null;
                pp.fullname(null);
                pp.photoUrl(null);
                pp.isAdmin(false);
                pp.isConnected(false);
                pp.username(null);
                pp.password(null);
                //router.navigate('#welcome');
              }
            });
          } else if (action == 'admin'){
               router.navigate('#administration');
          } else if (action == 'profil'){
              router.navigate('#profil');
          }
       }// action
    }// item
  }// select
  public update_menu(): any {
    var mm:InfoData.IMenuDesc[] = [];
    if (this.isConnected()){
      mm.push({
        refer:'#profil',
        title: 'Profil',
        desc: 'Profil utilisateur',
        img_source: 'images/profil.jpg',
        action: 'profil',
        parent: this
      });
      if (this.isAdmin()){
        mm.push({
          refer:'#administration',
          title: 'Administration',
          desc: 'Administration',
          img_source: 'images/administration.png',
          action: 'admin',
          parent: this
        });
      }
      mm.push({
        refer:'#disconnect',
        title: 'Déconnecter',
        desc: 'Déconnecter',
        img_source: 'images/disconnect.jpg',
        action: 'disconnect',
        parent: this
      });
    }
    this.menu(mm);
  }// update_menu
}// class HomeClass
var home = new HomeClass();
export = home;
