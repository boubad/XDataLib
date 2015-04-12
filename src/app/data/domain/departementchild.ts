//departementchild.ts
import InfoData = require("../../../infodata");
//
import BaseItem = require("./baseitem");
//
class DepartementChildItem extends BaseItem implements InfoData.IDepartementChildItem {
  public departementid: string;
 //
 constructor(oMap?: any) {
   super(oMap);
   this.departementid = null;
   if ((oMap != undefined) && (oMap != null)) {
     if (oMap.departementid != undefined) {
       this.departementid = oMap.departementid;
     }
   }// oMap
 }// constructor
 public get is_storeable(): boolean {
   return (this.type != null) && (this.collection_name != null) &&
     (this.departementid !== null);
 }
 public to_insert_map(oMap: any) : void {
   super.to_insert_map(oMap);
   oMap.departementid = this.departementid;
 }// to_insert_map
}// class DepartementChildItem
export = DepartementChildItem;
