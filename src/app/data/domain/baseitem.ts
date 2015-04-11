//baseitem.ts
import InfoData = require("../../../infodata.d");
//
class BaseItem implements InfoData.IBaseItem {
  public id: string;
  public rev: string;
  public attachments: any;
  public avatarid: string;
  //
  constructor(oMap?: any) {
    this.id = null;
    this.rev = null;
    this.attachments = null;
    this.avatarid = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap._id !== undefined) {
        this.id = oMap._id;
      }
      if (oMap._rev !== undefined) {
        this.rev = oMap._rev;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
      if (oMap._attachments !== undefined) {
        this.attachments = oMap._attachments;
      }
    }
  }// constructor
  public get base_prefix(): string {
    return null;
  }
  public get index_name(): string {
    return (this.collection_name !== null) ?
      this.collection_name + '/by_id' : null;
  }
  public create_id(): string {
    var n: number = Math.floor(Math.random() * 10000.0);
    var sn = '' + n;
    while (sn.length < 4) {
      sn = '0' + sn;n
    }
    var s: string = ((new Date()).toISOString()).substr(0, 10) + '-' + sn;
    return (this.base_prefix !== null) ?
      this.base_prefix + '-' + s : s;
  }// create_id
  public static check_date(d: Date): Date {
    var dRet: Date = null;
    if ((d !== undefined) && (d !== null)) {
      var t = Date.parse(d.toString());
      if (!isNaN(t)) {
        dRet = d;
      }
    }
    return dRet;
  }// check_date
  public get type(): string {
    return null;
  }
  public get collection_name(): string {
    return null;
  }
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null);
  }
  public to_insert_map(oMap: any): void {
    if ((this.id !== undefined) && (this.id !== null)) {
      oMap._id = this.id;
    }
    if ((this.rev !== undefined) && (this.rev !== null)) {
      oMap._rev = this.rev;
    }
    if ((this.type !== undefined) && (this.type !== null)) {
      oMap.type = this.type;
    }
    if ((this.avatarid !== undefined) && (this.avatarid !== null)) {
      oMap.avatarid = this.avatarid;
    }
  }
  public to_fetch_map(oMap: any): void {
    this.to_insert_map(oMap);
    if ((this.attachments !== undefined) && (this.attachments !== null)) {
      oMap._attachments = this.attachments;
    }
  }
  public toString(): string {
    var oMap = {};
    this.to_fetch_map(oMap);
    return JSON.stringify(oMap);
  }// toString
  public static array_contains(cont: any[], val: any): boolean {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              return true;
            }
          }
        }// i
      }// s
    }
    return false;
  }// _array_contains
  public static array_add(cont: any[], val: any): void {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var bFound: boolean = false;
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              bFound = true;
              break;
            }
          }
        }// i
        if (!bFound) {
          cont.push(val);
        }
      }// val
    }
  }// _array_add
  public static array_remove(cont: any[], val: any): void {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var index: number = -1;
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              index = i;
              break;
            }
          }
        }// i
        if (index >= 0) {
          cont = cont.splice(index, 1);
        }
      }// val
    }
  }// _array_add
  public sort_func(p1: InfoData.IBaseItem, p2: InfoData.IBaseItem): number {
    var vRet = -1;
    if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
      if ((p1.id !== undefined) && (p1.id !== null)) {
        if ((p2.id !== undefined) && (p2.id !== null)) {
          var s1 = p1.id.toString();
          var s2 = p2.id.toString();
          vRet = s1.localeCompare(s2);
        } else {
          vRet = 1;
        }
      } else {
        vRet = 1;
      }
    } else if ((p1 === undefined) || (p1 === null)) {
      vRet = 1;
    }
    return vRet;
  } // sort_func
}// class BaseItem
export = BaseItem;
