//profaffectation.ts
import InfoData = require('../../../infodata');
//
import Affectation = require('./affectation');
//
class ProfAffectation extends Affectation implements InfoData.IProfAffectation {
  private _profid: string;
  private _uniteid: string;
  private _matiereid: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._profid = null;
    this._uniteid = null;
    this._matiereid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.enseignantid != undefined) {
        this.enseignantid = oMap.enseignantid;
      }
      if (oMap.uniteid != undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.matiereid != undefined) {
        this.matiereid = oMap.matiereid;
      }
    }// oMap
  }// constructor
  public get base_prefix():string {
    return 'AFP';
  }
  public create_id():  string{
    var d:Date = (this.startDate !== null) ? this.startDate : new Date();
    var s = (d.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.semestreid + '-' + this.matiereid +
    '-' + this.enseignantid + '-' + this.groupeid + '-' + s;
  }// create_id
  //
  public get matiereid(): string {
    return this._matiereid;
  }
  public set matiereid(s: string) {
    if ((s != undefined) && (s != null) && (s.trim().length > 0)) {
      this._matiereid = s;
    } else {
      this._matiereid = null;
    }
  }

  //
  public get uniteid(): string {
    return this._uniteid;
  }
  public set uniteid(s: string) {
    if ((s != undefined) && (s != null) && (s.trim().length > 0)) {
      this._uniteid = s;
    } else {
      this._uniteid = null;
    }
  }

  //
  public get enseignantid(): string {
    return this._profid;
  }
  public set enseignantid(s: string) {
    if ((s != undefined) && (s != null) && (s.trim().length > 0)) {
      this._profid = s;
    } else {
      this._profid = null;
    }
  }

  //
  public get is_storeable(): boolean {
    var bRet:boolean = (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null) && (this.anneeid !== null) &&
       (this.semestreid !== null) &&
      (this.groupeid !== null) && (this.personid !== null) && (this.enseignantid !== null) &&
      (this.uniteid !== null) && (this.matiereid !== null) && (this.firstname !== null) &&
      (this.lastname !== null);
      if (!bRet){
        return false;
      }
    if ((this.startDate !== null) && (this.endDate !== null)) {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return false;
      }
    } else if ((this.startDate !== null) || (this.endDate != null)) {
      return false;
    }
    return true;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.enseignantid = this.enseignantid;
      oMap.uniteid = this.uniteid;
      oMap.matiereid = this.matiereid;
  }// to_insert_map
  public get type(): string {
    return 'profaffectation';
  }
  public get collection_name(): string {
    return 'profaffectations';
  }
}// class ProfAffectation
export = ProfAffectation;
