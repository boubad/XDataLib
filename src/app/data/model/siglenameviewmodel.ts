//siglenameviewmodel
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
/// <reference path="../../../../typings/durandal/durandal.d.ts"/>
//
import InfoData = require('../../../infodata');
import ko = require('knockout');
import PagedViewModel = require('./pagedviewmodel');
//
//
class SigleNameViewModel extends PagedViewModel {
  //
  public sigle:KnockoutComputed<string>;
  public name:KnockoutComputed<string>;
  //
  constructor(model:InfoData.IBaseItem) {
    super(model);
    this.sigle = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.sigle : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.sigle = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.name = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.name : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.name = s;
          this._current_data(x);
        }
      },
      owner : this
    });
  }// constructor
}// class PagedViewModel
export = SigleNameViewModel;