//itemgenerator.ts
import InfoData = require("../../../infodata");
//
import Departement = require("../domain/departement");
//
class ItemGenerator  implements InfoData.IItemGenerator {
  constructor() {
  }// constructor
  public create_item(oMap?: any): InfoData.IBaseItem {
    if ((oMap === undefined) || (oMap === null)) {
      return null;
    }
    if ((oMap.type === undefined) || (oMap.type === null)) {
      return null;
    }
    var t: string = oMap.type.trim().toLowerCase();
    if (t.length < 1) {
      return null;
    }
    if (t == 'departement') {
      return new Departement(oMap);
    }
    //
    return null;
  }// create_item
  public convert_items(dd: any[]): InfoData.IBaseItem[] {
    var oResult: InfoData.IBaseItem[] = [];
    if ((dd !== undefined) && (dd !== null) && (dd.length > 0)) {
      var n = dd.length;
      for (var i = 0; i < n; ++i) {
        var oMap = dd[i];
        var p = this.create_item(oMap);
        if (p !== null) {
          oResult.push(p);
        }
      }// i
    }// dd
    if (oResult.length > 1) {
      var p = oResult[0];
      var t = p.sort_func;
      if ((t !== undefined) && (t !== null)) {
        oResult.sort(t);
      }
    }
    return oResult;
  }// convert_items
}// class ItemGenerator
//
export = ItemGenerator;
