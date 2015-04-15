// profilviwmodel.ts
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
import InfoData = require('../../../infodata');
import ko = require('knockout');
import BaseViewModel = require('./baseviewmodel');
import dataService = require('../services/dataservice');
import MenuDesc = require('../domain/menudesc');
import FileData = require('./filedata');
//
declare var window:any;
//
class ProfilViewModel extends BaseViewModel {
	//
  	public newPassword:KnockoutObservable<string>;
  	public confirmPassword:KnockoutObservable<string>;
	//
    public lastname:KnockoutObservable<string>;
    public firstname:KnockoutObservable<string>;
    public email:KnockoutObservable<string>;
    public phone:KnockoutObservable<string>;
    public description:KnockoutObservable<string>;
  //
  public canChangePwd:KnockoutComputed<boolean>;
  public canSave:KnockoutComputed<boolean>;
  public canSetAvatar:KnockoutComputed<boolean>;
  //
  public fileData:KnockoutObservable<FileData>;
  public passwordMode:KnockoutObservable<boolean>;
  public avatarMode:KnockoutObservable<boolean>;
  public dataMode:KnockoutObservable<boolean>;
  //
  constructor() {
    super();
    this.avatarMode = ko.observable(false);
    this.passwordMode = ko.observable(false);
    this.dataMode = ko.observable(true);
    this.newPassword = ko.observable(null);
    this.confirmPassword = ko.observable(null);
    this.lastname = ko.observable(null);
    this.firstname = ko.observable(null);
    this.email = ko.observable(null);
    this.phone = ko.observable(null);
    this.description = ko.observable(null);
    this.fileData = ko.observable(new FileData());
    //
    this.canSetAvatar = ko.computed(()=>{
      var userinfo = this.userInfo;
      if ((userinfo.personid === null) || (userinfo.personrev === null)){
        return false;
      }
      var bRet = false;
      var d = this.fileData();
      if ((d !== null) && (d.arrayBuffer !== undefined) && (d.type !== undefined) && (d.name !== undefined)){
          var data = d.arrayBuffer();
          if ((data !== undefined) && (data !== null) && (d.type() !== null) && (d.name !== null)){
              bRet = true;
          }
        }// d
      return bRet;
      },this);
    this.canSave = ko.computed(()=>{
    	var userinfo = this.userInfo;
    	if ((userinfo.personid === null) || (userinfo.personrev === null)){
    		return false;
    	}
    	var x1 = this.firstname();
    	var x2 = this.lastname();
    	return (x1 !== null) && (x1.trim().length > 0) && (x2 !== null) && (x2.trim().length > 0);
    },this);
    this.canChangePwd = ko.computed(()=>{
    	var userinfo = this.userInfo;
    	if ((userinfo.personid === null) || (userinfo.personrev === null)){
    		return false;
    	}
      var bRet:boolean = false;
      var x2 = this.newPassword();
      var x3 = this.confirmPassword();
      return  ((x2 !== null) && (x3 !== null)  && (x2.trim().length > 0) && (x2 == x3));
    },this);
  }// constructor
  public disconnect() : any {
        this.fileData(new FileData());
        return super.disconnect();
        }// disconnect
  public setDataMode(): any {
    this.avatarMode(false);
    this.passwordMode(false);
    this.dataMode(true);
    this.update_menu();
  }
  public setPasswordMode() : any {
    this.avatarMode(false);
    this.dataMode(false);
    this.passwordMode(true);
    this.update_menu();
  }
  public setAvatarMode(): any {
    this.dataMode(false);
    this.passwordMode(false);
    this.avatarMode(true);
    this.update_menu();
  }
  public update_menu(): any {
    var mm:InfoData.IMenuDesc[] = [];
    mm.push(new MenuDesc('home','Accueil','images/home.jpg'));
    if (this.avatarMode()){
       mm.push(new MenuDesc('profildata','Infos','images/profildata.jpg',this,(p:ProfilViewModel)=>{
        p.setDataMode();
        }));
       mm.push(new MenuDesc('password','Mot de passe','images/password.jpg',this,(p:ProfilViewModel)=>{
        p.setPasswordMode();
        }));
    } else if (this.passwordMode()){
       mm.push(new MenuDesc('profildata','Infos','images/profildata.jpg',this,(p:ProfilViewModel)=>{
        p.setDataMode();
        }));
      mm.push(new MenuDesc('avatar','Avatar','images/avatar.png', this, (p:ProfilViewModel)=>{
        p.setAvatarMode();
        }));
    } else if (this.dataMode()){
      mm.push(new MenuDesc('password','Mot de passe','images/password.jpg',this,(p:ProfilViewModel)=>{
        p.setPasswordMode();
        }));
      mm.push(new MenuDesc('avatar','Avatar','images/avatar.png', this, (p:ProfilViewModel)=>{
        p.setAvatarMode();
        }));
    }
    this.menu(mm);
  }// update_menu
  public changePwd(): any {
    var x2 = this.newPassword();
    if (x2 === null){
      return;
    }
    this.newPassword(null);
    this.confirmPassword(null);
    //
    this.clear_error();
    var xinfo = this.userInfo;
    var self = this;
    var id = xinfo.personid;
    dataService.get_item_by_id(id).then((p:InfoData.IPerson)=>{
    		if ((p !== undefined) && (p !== null)) {
    			p.change_password(x2);
    			dataService.maintains_one_item(p).then((r)=>{
    				dataService.get_item_by_id(id).then((x:InfoData.IPerson)=>{
    					if ((x !== undefined) && (x !== null)){
    						    xinfo.person = x;
    							self.infoMessage('Mot de passe modifié!');
    						} else {
    							self.errorMessage('Unexpected error...');
    						}
    					},(ex)=>{
    					self.set_error(ex);
    					});
    				},(e)=>{
    				self.set_error(e);
    				});
    			}// p
    	},(err)=>{
    		self.set_error(err);
    		});
  }// changePwd
  public setAvatar() : any {
    var self = this;
    var fdata = this.fileData();
    var userinfo = this.userInfo;
    var data = fdata.arrayBuffer();
    var dd = new Uint8Array(data);
    var blob = new Blob([dd]);
    var docid = userinfo.personid;
    var avatarid = fdata.name();
    var type = fdata.type();
    this.clear_error();
    return dataService.get_item_by_id(docid,true).then((p)=>{
       return dataService.maintains_attachment(p,avatarid,blob,type);
      }).then((r)=>{
          return dataService.get_item_by_id(docid,true);
        }).then((px)=>{
           px.avatarid = avatarid;
           return dataService.maintains_one_item(px);
          }).then((rs)=>{
            return dataService.get_item_by_id(docid,true);
            }).then((z:InfoData.IPerson)=>{
              userinfo.person = z;
             var vid = z.avatarid;
             if (vid === null){
              return null;
             }  else {
              return dataService.get_docid_attachment(docid,avatarid);
             } 
            }).then((dx)=>{
               if ((dx !== undefined) && (dx !== null)){
                  var x = window.URL.createObjectURL(dx);
                self.photoUrl(x);
                self.infoMessage('Avatar modifié!');
               } else {
                self.photoUrl(null);
               }
               self.fileData(new FileData());
              }).catch((err)=>{
       self.set_error(err);
      });
    }// setAvatar
  public activate(): any {
    this.clear_error();
    var p = this.userInfo;
    this.newPassword(null);
    this.firstname(p.firstname);
    this.lastname(p.lastname);
    this.email(p.email);
    this.phone(p.phone);
    this.description(p.description);
    super.activate();
  }
  public save() : any {
   var self = this;
   var xinfo = this.userInfo;
   var id = xinfo.personid;
   this.clear_error();
   return dataService.get_item_by_id(id).then((p:InfoData.IPerson)=>{
   	 if ((p !== undefined ) && (p !== null)){
   	 		p.firstname = self.firstname();
   	 		p.lastname = self.lastname();
   	 		p.email = self.email();
   	 		p.phone = self.phone();
   	 		p.description = self.description();
   	 		dataService.maintains_one_item(p).then((x)=>{
   	 			dataService.get_item_by_id(id).then((z:InfoData.IPerson)=>{
    					if ((z !== undefined) && (z !== null)){
    						    xinfo.person = z;
    							self.infoMessage('Modifications enregistrées!');
    						} else {
    							self.errorMessage('Unexpected error...');
    						}
    					},(ex)=>{
    					self.set_error(ex);
    					});
   	 			},(e)=>{
   	 			self.set_error(e);
   	 			});
   	 	} else {
   	 		self.set_error('Utilisateur inconnu...');
   	 	}
   	},(err)=>{
   	 self.set_error(err);
   	});
  }// save
	}// class ProfilViewModel
	export = ProfilViewModel;
