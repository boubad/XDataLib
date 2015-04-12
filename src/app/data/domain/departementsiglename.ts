//departementsiglename.ts
//
import InfoData = require("../../../infodata");
import DepartementChildItem = require("./departementchild");
//
class DepartementSigleNameItem extends DepartementChildItem
 implements InfoData.ISigleNameItem {
  public sigle:string;
  public name:string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this.sigle = null;
    this.name = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.sigle != undefined) {
        this.sigle = oMap.sigle;
      }
      if (oMap.name != undefined) {
        this.name = oMap.name;
      }
    }// oMap
  }// constructor
  public create_id():  string{
    return this.base_prefix + '-' + this.departementid + '-' +
    this.sigle.toUpperCase();
  }// create_id
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.departementid !== null) && (this.sigle !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
    oMap.sigle = this.sigle;
    oMap.name = this.name;
  }// to_insert_map
} // class SigleNameItemItem
export = DepartementSigleNameItem;
