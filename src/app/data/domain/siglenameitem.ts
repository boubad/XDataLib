// siglenameitem.ts
import InfoData = require("../../../infodata");
//
import BaseItem = require('./baseitem');
//
class SigleNameItem extends BaseItem implements InfoData.ISigleNameItem {
  public sigle: string;
  public name: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this.sigle = null;
    this.name = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.sigle !== undefined) {
        this.sigle = oMap.sigle;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
    } // oMap
  }// constructor
  public create_id(): string {
    var ss = this.sigle;
    if (ss === null) {
      return super.create_id();
    }
    ss = ss.toUpperCase();
    var s = this.base_prefix;
    if (s !== null) {
      s = s + "-" + ss;
    } else {
      s = ss;
    }
    return s;
  }// create_id
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.sigle !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.sigle = this.sigle;
    oMap.name = this.name;
  } // toInsertMap
  public sort_func(p1: InfoData.ISigleNameItem, p2: InfoData.ISigleNameItem): number {
    var vRet = -1;
    if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
      if ((p1.sigle !== undefined) && (p1.sigle !== null)) {
        if ((p2.sigle !== undefined) && (p2.sigle !== null)) {
          var s1 = p1.sigle;
          var s2 = p2.sigle;
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
}// class SigleNameItem
export = SigleNameItem;
