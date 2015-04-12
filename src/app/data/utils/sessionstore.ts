//sessionstore.ts
//
import InfoData = require("../../../infodata");
//
var bExists = (window.sessionStorage !== undefined) &&
  (window.sessionStorage !== null);
//
class SessionObjectStore implements InfoData.IObjectStore {
  constructor() {
  }// constructor
  public get_value(key: string): any {
    var vRet: any = null;
    if (bExists && (key !== undefined) && (key !== null)) {
      var skey = key.trim().toLowerCase();
      if (skey.length > 0) {
        var sval: string = window.sessionStorage.getItem(skey);
        if (sval !== null) {
          vRet = JSON.parse(sval);
        }// sval
      }// skey
    }// exists
    return vRet;
  }// get_value
  public store_value(key: string, value: any): any {
    var bRet: boolean = false;
    if (bExists && (key !== undefined) && (key !== null)) {
      var skey = key.trim().toLowerCase();
      if (skey.length > 0) {
        if ((value !== undefined) && (value !== null)) {
          try {
            var sval = JSON.stringify(value);
            window.sessionStorage.setItem(skey, sval);
            bRet = true;
          } catch (e) {
            console.log('SessioObjectStore error: ' + e.toString());
          }
        } else {
          if (window.sessionStorage.getItem(skey) !== null) {
            window.sessionStorage.removeItem(skey);
          }
        }
        bRet = true;
      }// skey
    }// exists
    return bRet;
  }// store_value
  public remove_value(key: string): any {
    return this.store_value(key, null);
  }// remove_value
}// class SessionObjectStore
export = SessionObjectStore;
