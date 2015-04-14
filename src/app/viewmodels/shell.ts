// shell.ts
/// <reference path="../../../typings/durandal/durandal.d.ts"/>
import router = require('plugins/router');
import app = require('durandal/app');
import dataService = require('../data/services/dataservice');
//
class ShellClass {
  public router:DurandalRouter;
  constructor(){
    this.router = router;
  }// constructor
  public activate(): any {
    router.map([
        { route: '', title:'Accueil', moduleId: 'viewmodels/home', nav: true },
        { route: 'welcome', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false },
        { route: 'home', title:'Accueil', moduleId: 'viewmodels/home', nav: false },
        { route: 'profil', title:'Profil', moduleId: 'viewmodels/profil', nav: true },
        { route: 'administration', title:'Administration', moduleId: 'viewmodels/welcome', nav: false },
        { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
    ]).buildNavigationModel();
    dataService.check_admin().then((x)=>{
      return router.activate();
    },(err)=>{
      return router.activate();
    });
  }// activate
  public search() : any {
    //It's really easy to show a message box.
    //You can add custom options too. Also, it returns a promise for the user's response.
    app.showMessage('Search not yet implemented...');
  }
}// class ShellClass
var shell = new ShellClass();
export = shell;
