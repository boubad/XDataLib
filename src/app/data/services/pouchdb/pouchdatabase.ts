//pouchdatabase.ts
/// <reference path="../../../../../typings/bluebird/bluebird.d.ts"/>
/// <reference path="../../../../../typings/pouchdb/pouchdb.d.ts"/>
//
import Promise = require("bluebird");
import PouchDB = require("pouchdb");
import InfoData = require("../../../../infodata.d");
import ItemGenerator = require("../itemgenerator");
import ElementDesc = require("../../domain/elementdesc");
import Person = require('../../domain/person');
//
var DEFAULT_DATABASE: string = 'geninfo';
//
class PouchDatabase implements InfoData.IDatabaseManager {
  //
  private _db: PouchDB;
  private _gen: InfoData.IItemGenerator;
  //
  public url: string;
  //
  constructor(xurl?: string, gen?: InfoData.IItemGenerator) {
    this._db = null;
    this._gen = ((gen !== undefined) && (gen !== null)) ? gen :
    new ItemGenerator();
    this.url = ((xurl !== undefined) && (xurl !== null)) ? xurl : DEFAULT_DATABASE;
  }// constructor
  public create_item(oMap?: any): InfoData.IBaseItem {
    return this._gen.create_item(oMap);
  }
  public get db(): Promise<PouchDB> {
    return new Promise((resolve: (r: PouchDB) => Promise<PouchDB>,
      reject: (e: Error) => any) => {
      if (this._db !== null) {
        resolve(this._db);
      } else {
        var name: string = ((this.url !== undefined) && (this.url !== null)) ? this.url : null;
        var xname: string = (name !== null) ? name.trim().toLowerCase() : null;
        var bLocal: boolean = true;
        if ((xname !== null) && (xname.indexOf('http') >= 0)) {
          bLocal = false;
        }
        if (xname === null) {
          reject(new Error('PouchDatabase open error : invalid name'));
        } else {
          var options: PouchOptions = {};
          if (bLocal) {
            options.auto_compaction = true;
          }
          var xdb = new PouchDB(name, options, (err, res) => {
            if ((err !== undefined) && (err !== null)) {
              reject(new Error(err.reason));
            } else {
              this._db = res;
              resolve(this._db);
            }
          });
        } // opn1
      }// open
    });
  }// db
  //
  public check_admin(): Promise<any> {
    /*
     var pPers = new Person();
         pPers.username = 'admin';
         pPers.lastname = 'System';
         pPers.firstname = 'Administrator';
         pPers.roles = ['super','admin','oper','prof','etud','reader'];
         pPers.reset_password();
         var oMap = {};
         pPers.to_insert_map(oMap);
         return this.maintains_doc(oMap);
         */
    
    return this.db.then((xdb)=>{
      return xdb.get('PER-admin');
    }).then((p:PouchGetResponse)=>{
      return p;
    },(e)=>{
      if (e.status == 404){
         var pPers = new Person();
         pPers.username = 'admin';
         pPers.lastname = 'System';
         pPers.firstname = 'Administrator';
         pPers.roles = ['super','admin','oper','prof','etud','reader'];
         pPers.reset_password();
         var oMap = {};
         pPers.to_insert_map(oMap);
         return this.maintains_doc(oMap).then((z)=>{
           return null;
         });
      } else {
        return null;
      }
    });
    
  }// check_admin
  //
  public get_item_by_id(id: string,bAttachments?:boolean): Promise<InfoData.IBaseItem> {
    return this.db.then((xdb) => {
      if ((bAttachments !== undefined) && (bAttachments !== null) && (bAttachments == true)){
          return xdb.get(id,{attachments:true});
        } else {
          return xdb.get(id);
        }
    }).then((doc) => {
        return this.create_item(doc);
      }, (err: PouchError) => {
        if (err.status == 404) {
          return null;
        } else {
          throw new Error(err.reason);
        }
      });
  }//get_item_by_id
  //
  public find_person_by_username(username: string): Promise<InfoData.IBaseItem> {
    return this.get_item_by_id('PER-' + username);
  }// find_person_by_username
  //
  public get_items_array(ids: string[]): Promise<InfoData.IBaseItem[]> {
    return this.db.then((xdb) => {
      return xdb.allDocs({
        keys: ids,
        include_doc: true, attachments: true
      }).then((rr) => {
          var oRet: InfoData.IBaseItem[] = [];
          if ((rr !== undefined) && (rr !== null)) {
            var oMaps: any[] = [];
            var data = rr.rows;
            if ((data !== undefined) && (data !== null)) {
              var n = data.length;
              for (var i = 0; i < n; ++i) {
                var r = data[i];
                var val = r.value;
                if ((val !== undefined) && (val !== null)) {
                  if ((val.deleted === undefined) && (val.error === undefined)) {
                    var oMap = this.create_item(r.doc);
                    if (oMap !== null) {
                      oMaps.push(oMap);
                    }
                  }
                }
              }// i
            }// data
            if (oMaps.length > 0) {
              oRet = this._gen.convert_items(oMaps);
            }
          }// rr
          return oRet;
        });
    });
  }//get_items_array
  //
  public find_elements_range(indexName: string, startKey?: any, endKey?: any,
    skip?: number, limit?: number,
    descending?: boolean, bIncludeEnd?: boolean, bDoc?: boolean, bAttach?: boolean):
    Promise<InfoData.IElementDesc[]> {
    var options: PouchAllDocsOptions = {};
    var bGetData: boolean = false;
    if ((startKey !== undefined) && (startKey !== null)) {
      options.startkey = startKey;
    }
    if ((endKey != undefined) && (endKey !== null)) {
      options.endkey = endKey;
    }
    if ((bIncludeEnd !== undefined) && (bIncludeEnd !== null)) {
      options.inclusive_end = bIncludeEnd;
    }
    if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
      options.skip = skip;
    }
    if ((limit !== undefined) && (limit !== null) &&
      (limit > 0)) {
      options.limit = limit;
    }
    if ((descending !== undefined) && (descending !== null)) {
      options.descending = descending;
    }
    if ((bDoc !== undefined) && (bDoc !== null)) {
      options.include_docs = bDoc;
      bGetData = true;
    }
    if ((bAttach !== undefined) && (bAttach !== null)) {
      options.attachments = bAttach;
    }
    return this.db.then((xdb) => {
      return xdb.query(indexName, options).then((rr) => {
        var oRet: any[] = [];
        if ((rr !== undefined) && (rr !== null)) {
          var data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            var n = data.length;
            for (var i = 0; i < n; ++i) {
              var r = data[i];
              if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// i
          }// data
        }// rr
        return oRet;
      });
    });
  }//find_elements_range
  //
  public maintains_doc(ddoc: any): Promise<PouchUpdateResponse> {
    var d: PouchDB = null;
    return this.db.then((xdb) => {
      d = xdb;
      return d.get(ddoc._id);
    }).then((r) => {
        ddoc._rev = r._rev;
        return d.put(ddoc);
      }, (e: PouchError) => {
        if (e.status == 404) {
          return d.put(ddoc);
        } else {
          throw new Error(e.reason);
        }
      });
  }// maintains_doc
  //
  public maintains_one_item(item: InfoData.IBaseItem):
    Promise<InfoData.IBaseItem> {
    var oMap = {};
    item.to_insert_map(oMap);
    return this.maintains_doc(oMap).then((r) => {
      item.rev = r.rev;
      return item;
    });
  }//maintains_one_item
  //
  public remove_one_item(item: InfoData.IBaseItem):
    Promise<PouchUpdateResponse> {
    var oMap = { _id: item.id, _rev: item.rev };
    return this.db.then((xdb) => {
      return xdb.remove(oMap);
    });
  }//remove_one_item
  //
  public maintains_items(items: InfoData.IBaseItem[]):
    Promise<PouchUpdateResponse[]> {
    var oMaps: any[] = [];
    var n = items.length;
    for (var i = 0; i < n; ++i) {
      var item = items[i];
      if ((item !== undefined) && (item !== null) &&
        item.is_storeable) {
        var oMap = {};
        item.to_insert_map(oMap);
        oMaps.push(oMap);
      }
    }// i
    return this.db.then((xdb) => {
      return xdb.bulkDocs(oMaps);
    });
  }// maintains_items
  public remove_items(items: InfoData.IBaseItem[]):
    Promise<PouchUpdateResponse[]> {
    var oMaps: any[] = [];
    var n = items.length;
    for (var i = 0; i < n; ++i) {
      var item = items[i];
      if ((item !== undefined) && (item !== null) &&
        (item.id !== null) && (item.rev !== null)) {
        var oMap = { _id: item.id, _rev: item.rev, _deleted: true };
        oMaps.push(oMap);
      }
    }// i
    return this.db.then((xdb) => {
      return xdb.bulkDocs(oMaps);
    });
  }// maintains_items
  public get_docid_attachment(docid: string, attachmentid: string): Promise<any> {
    return this.db.then((xdb) => {
      return xdb.getAttachment(docid, attachmentid);
    }).then((r) => {
        return r;
      }, (ex) => {
        if (ex.status == 404) {
          return null;
        } else {
          throw ex;
        }
      });
  }// get_docid_attachment
  //
  public maintains_attachment(item: InfoData.IBaseItem, attachmentId: string,
    attachment: Blob, type: string): Promise<any> {
    return this.db.then((xdb) => {
      return xdb.putAttachment(item.id, attachmentId, item.rev, attachment, type);
    }).then((r) => {
        item.rev = r.rev;
        return r;
      });
  }// maintains_attachment
  //
  public remove_attachment(item: InfoData.IBaseItem, attachmentId: string):
    Promise<any> {
    return this.db.then((xdb) => {
      return xdb.removeAttachment(item.id, attachmentId, item.rev);
    }).then((r) => {
        item.rev = r.rev;
        return r;
      });
  }//  remove_attachment
}// class PouchDatabase
export = PouchDatabase;
