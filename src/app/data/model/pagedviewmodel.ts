//pagedviewmodel.ts
//
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
/// <reference path="../../../../typings/durandal/durandal.d.ts"/>
//
import Promise = require('bluebird');
import InfoData = require('../../../infodata');
import ko = require('knockout');
import BaseViewModel = require('./baseviewmodel');
import dataService = require('../services/dataservice');
//
declare var window:any;
//
class PagedViewModel extends BaseViewModel {
	//
  private _oldElement:InfoData.IElementDesc;
  public items:KnockoutObservableArray<InfoData.IElementDesc>;
  public _current_element:KnockoutObservable<InfoData.IElementDesc>;
  public _current_data:KnockoutObservable<InfoData.IBaseItem>;
  public current:KnockoutComputed<InfoData.IElementDesc>;
  public current_person:KnockoutObservable<InfoData.IPerson>;
  public current_url:KnockoutObservable<string>;
  public start_key:any;
  public next_key:any;
  public prev_key:any;
  public itemsPerPage:KnockoutObservable<number>;
  public modelItem:InfoData.IBaseItem;
  public canPrevPage:KnockoutObservable<boolean>;
  public canNextPage:KnockoutObservable<boolean>;
  public add_mode:KnockoutObservable<boolean>;

  public skip:number;
  //

	//
	constructor(model?:InfoData.IBaseItem){
		super();
		this.modelItem = model;
		this.add_mode = ko.observable(false);
    this._oldElement = null;
    this.items = ko.observableArray([]);
    this._current_element = ko.observable(null);
    this.current_person = ko.observable(null);
    this.current_url = ko.observable(null);
    this._current_data = ko.observable(null);
    this.start_key = null;
    this.next_key = null;
    this.prev_key = null;
    this.skip = 0;
    this.itemsPerPage = ko.observable(16);
    this.canPrevPage = ko.observable(false);
    this.canNextPage = ko.observable(false);
    //
	this.current = ko.computed({
      read: ()=>{
        var x = this._current_element();
        return x;
      },
      write : (s:InfoData.IElementDesc) =>{
          this.add_mode(false);
          this._current_element(s);
          this.change_current(s);
          this.update_menu();
      },
      owner: this
    });
	}// constructor
	//
	public create_item() : InfoData.IBaseItem {
			if ((this.modelItem !== null) && (this.modelItem.type !== null)){
				return dataService.create_item({type: this.modelItem.type});
			}
			return null;
		}// create_item
  public addNew(): any {
    this._oldElement = this.current();
    this.current(null);
    this.add_mode(true);
  }// addNew
  public cancel() : any {
    this.current(this._oldElement);
    this.add_mode(false);
  }
  public change_current(s:InfoData.IElementDesc) : any {
    var id = (s !== null) ? s.id : null;
    if (s === null){
      this.current_url(null);
      this._current_data(null);
      this.current_person(null);
      this.update_menu();
      return;
    }
    this.current_url(s.url);
    var pRet = null;
    return dataService.get_item_by_id(id,true).then((p)=>{
      this._current_data(p);
      pRet = p;
      if (s.personid === null){
        return null;
      } else {
        return dataService.get_item_by_id(s.personid);
      }
    }).then((pPers:InfoData.IPerson)=>{
      this.current_person(pPers);
      return pRet;
    });
  }// change_current
  public create_start_key():any{
    return [];
  }
  public retrieve_one_avatar(item:InfoData.IElementDesc) : Promise<InfoData.IElementDesc> {
  	 return new Promise((resolve:(x:InfoData.IElementDesc)=>Promise<InfoData.IElementDesc>,reject) =>{
  	 	 var docid = item.avatardocid;
  	 	 var id = item.avatarid;
  	 	 item.url = null;
  	 	 if ((docid === null) || (id === null)){
  	 	 	resolve(item);
  	 	 } else {
  	 	 	dataService.get_docid_attachment(docid,id).then((blob)=>{
  	 	 		if ((blob !== undefined) && (blob !== null)){
  	 	 			resolve(item);
  	 	 		} else {
  	 	 			var x = window.URL.createObjectURL(blob);
  	 	 			item.url = x;
  	 	 			resolve(item);
  	 	 		}
  	 	 		},(err)=>{
  	 	 		resolve(item);
  	 	 		});
  	 	 }
  	 	});
  	}// retrieve_one_avatar
  public retrieve_avatars(elems:InfoData.IElementDesc[]) : any {
  	var pp:any[] = [];
  	for (var i = 0; i < elems.length; ++i){
  		pp.push(this.retrieve_one_avatar(elems[i]));
  	}
  	return Promise.all(pp);
  }// retrieve_avatars
  public refreshAll() : any {
    this.prev_key = null;
    this.start_key = null;
    this.next_key = null;
    this.refresh();
  }
  public refresh(): any {
    var limit:number  = this.itemsPerPage();
    var skip:number = this.skip;
    var startKey = this.start_key;
    var first
    if (startKey === null){
      startKey = this.create_start_key();
    }
    var endKey = null;
    var descending = null;
    var bIncludeEnd = null;
    var bDoc = null;
    var bAttach = null;
    var model = this.modelItem;
    this.clear_error();
    var oldid = (this._current_data() !== null) ? this._current_data().id : null;
    return dataService.find_elements_range(model.index_name,startKey, endKey, skip,limit,
    descending,bIncludeEnd,bDoc,bAttach).then((rr:InfoData.IElementDesc[])=>{
      return this.retrieve_avatars(rr);
    }).then((dd)=>{
      if ((dd !== undefined) && (dd !== null)){
        this.prev_key = startKey;
        var n = dd.length;
        if (n < limit){
          this.next_key = null;
          this.canNextPage(false);
        } else  if (n > 0) {
          this.skip = 0;
          var x = dd[ n - 1];
          this.next_key = x.key;
          this.canNextPage(true);
        }
        this.items(dd);
        var pSel:InfoData.IElementDesc = null;
        if (oldid !== null){
          var n = dd.length;
          for (var i = 0; i < n; ++i){
            var x = dd[i];
            if (x.id == oldid){
              pSel = x;
              break;
            }
          }// i
        }// old
        this.current(pSel);
        if (dd.length < 1){
          this.addNew();
        }
      } else {
        this.items([]);
        this.addNew();
      }
    });
    //
  }// refresh
	}// class PagedViewModel
	export = PagedViewModel;