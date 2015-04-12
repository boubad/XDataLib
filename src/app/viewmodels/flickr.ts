//flicker.ts
/// <reference path="../../../typings/durandal/durandal.d.ts"/>
/// <reference path="../../../typings/knockout/knockout.d.ts"/>
//
import http = require('plugins/http');
import app = require('durandal/app');
import ko = require('knockout');
//
class Flicker {
  public displayName: string;
  public images: KnockoutObservableArray<any>;
  //
  constructor() {
    this.displayName = 'Flickr';
    this.images = ko.observableArray([]);
  } // constructor
  public activate(): any {
      //the router's activator calls this function and waits for it to complete before proceeding
      if (this.images().length > 0) {
        return;
      }
      var that = this;
      return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'mount ranier', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
        that.images(response.items);
      });
    }// activate
    public select(item:any): any {
      //the app model allows easy display of modal dialogs by passing a view model
      //views are usually located by convention, but you an specify it as well with viewUrl
      item.viewUrl = 'views/detail';
      app.showDialog(item);
    }// select
    public canDeactivate(): any  {
      //the router's activator calls this function to see if it can leave the screen
      return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
    }// canDeactivate
}// class Flickers
//
var flicker = new Flicker();
//
export = flicker;
