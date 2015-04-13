//home.ts
/// <reference path='../../../typings/knockout/knockout.d.ts'/>
/// <reference path='../../../typings/durandal/durandal.d.ts'/>
//
import InfoData = require('../../infodata');
import ko = require('knockout');
import UserInfo = require('../data/model/userinfo');
import BaseViewModel = require('../data/model/baseviewmodel');
import shell = require('./shell');
import app = require('durandal/app');
//
var router = shell.router;
//
class HomeClass extends BaseViewModel {
  //
  constructor(){
    super();
    //this.router = shell.router;
  }// constructor
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
                router.navigate('#welcome');
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
    mm.push({
      refer:'#profil',
      title: 'Profil',
      desc: 'Profil utilisateur',
      img_source: 'images/profil.jpg',
      action: 'profil',
      parent: this
    });
    mm.push({
      refer:'#administration',
      title: 'Administration',
      desc: 'Administration',
      img_source: 'images/administration.png',
      action: 'admin',
      parent: this
    });
    mm.push({
      refer:'#disconnect',
      title: 'Déconnecter',
      desc: 'Déconnecter',
      img_source: 'images/disconnect.jpg',
      action: 'disconnect',
      parent: this
    });
    this.menu(mm);
  }// update_menu
}// class HomeClass
var home = new HomeClass();
export = home;
