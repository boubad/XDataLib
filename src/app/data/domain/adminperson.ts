//// adminperson.ts
import InfoData = require('../../../infodata');
//
import Person = require('./person');
//
class AdminPerson extends Person implements InfoData.IAdminPerson {
  //
  constructor(oMap?: any) {
    super(oMap);
    this.roles = ['admin'];
  }
  public get type(): string {
    return "adminperson";
  }
  //
} // class AdminPerson
export = AdminPerson;
