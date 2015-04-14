// profilviwmodel.ts
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
import InfoData = require('../../../infodata');
import ko = require('knockout');
import BaseViewModel = require('./baseviewmodel');
import dataService = require('../services/dataservice');
import MenuDesc = require('../domain/menudesc');
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
  //
  constructor() {
    super();
    this.newPassword = ko.observable(null);
    this.confirmPassword = ko.observable(null);
    this.lastname = ko.observable(null);
    this.firstname = ko.observable(null);
    this.email = ko.observable(null);
    this.phone = ko.observable(null);
    this.description = ko.observable(null);
    //
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
  public update_menu(): any {
  	var self = this;
    var mm:InfoData.IMenuDesc[] = [];
    mm.push(new MenuDesc('home','Accueil','images/home.jpg'));
    mm.push(new MenuDesc('disconnect','Déconnecter','images/disconnect.jpg',
        this,(p:ProfilViewModel) => {
           p.disconnect();
           self.navigate('home');
          }));
    this.menu(mm);
  }// update_menu
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