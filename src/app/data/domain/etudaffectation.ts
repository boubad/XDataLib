//etudaffectation.ts
import InfoData = require('../../../infodata');
//
import Affectation = require('./affectation');
//
class EtudAffectation extends Affectation implements InfoData.IEtudAffectation {
  private _etudiantid: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._etudiantid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.etudiantid != undefined) {
        this.etudiantid = oMap.etudiantid;
      }
    }// oMap
  }// constructor
  public get base_prefix():string {
    return 'ETF';
  }
  public create_id():  string{
    var d:Date = (this.startDate !== null) ? this.startDate : new Date();
    var s = (d.toISOString()).substr(0,10);
    return this.base_prefix + ' - ' + this.semestreid + '-'  +
    '-' + this.etudiantid + '-' + this.groupeid + '-' + s;
  }// create_id
  //
  public get etudiantid(): string {
    return this._etudiantid;
  }
  public set etudiantid(s: string) {
    if ((s != undefined) && (s != null) && (s.trim().length > 0)) {
      this._etudiantid = s;
    } else {
      this._etudiantid = null;
    }
  }

  //
  public get is_storeable(): boolean {
    var bRet:boolean = (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null) && (this.anneeid !== null) &&
       (this.semestreid !== null) &&
      (this.groupeid !== null) && (this.personid !== null) && (this.etudiantid !== null) &&
      (this.firstname !== null) &&
      (this.lastname !== null);
      if (!bRet){
        return false;
      }
    if ((this.startDate !== null) && (this.endDate !== null)) {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return false;
      }
    } else if ((this.startDate !== null) || (this.endDate !== null)) {
      return false;
    }
    return true;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.etudiantid = this.etudiantid;
  }// to_insert_map
  public get type(): string {
    return 'etudaffectation';
  }
  public get collection_name(): string {
    return 'etudaffectations';
  }
}// class EtudAffectation
export = EtudAffectation;
