// shell.ts
/// <reference path="../../../typings/durandal/durandal.d.ts"/>
import router = require('plugins/router');
import app = require('durandal/app');
//
class ShellClass {
  public router:DurandalRouter;
  constructor(){
    this.router = router;
  }// constructor
  public activate(): any {
    router.map([
        { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
        { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
    ]).buildNavigationModel();
    return router.activate();
  }// activate
  public search() : any {
    //It's really easy to show a message box.
    //You can add custom options too. Also, it returns a promise for the user's response.
    app.showMessage('Search not yet implemented...');
  }
}// class ShellClass
var shell = new ShellClass();
export = shell;
