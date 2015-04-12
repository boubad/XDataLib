//affectation.ts
import InfoData = require('../../../infodata');
//
import BaseItem = require('./baseitem');
import DepartementChild = require('./departementchild');
//
class Affectation extends DepartementChild implements InfoData.IAffectation {
  private _anneeid:string;
  private _semestreid: string;
  private _groupeid: string;
  private _personid: string;
  private _start: Date;
  private _end: Date;
  public firstname: string;
  public lastname: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._anneeid = null;
    this._semestreid = null;
    this._groupeid = null;
    this._personid = null;
    this._start = null;
    this._end = null;
    this.firstname = null;
    this.lastname = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.anneeid !== undefined) {
        this.anneeid = oMap.anneeid;
      }
      if (oMap.semestreid !== undefined) {
        this.semestreid = oMap.semestreid;
      }
      if (oMap.groupeid !== undefined) {
        this.groupeid = oMap.groupeid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
      if (oMap.firstname !== undefined){
        this.firstname = oMap.firstname;
      }
      if (oMap.lastname !== undefined){
        this.lastname = oMap.lastname;
      }
    }// oMap
  }// constructor

  public get fullname(): string {
    var s = '';
    if (this.lastname !== null) {
      s = this.lastname;
    }
    if (this.firstname !== null) {
      s = s + ' ' + this.firstname;
    }
    s = s.trim();
    return (s.length > 0) ? s : null;
  } // fullname

  //
  public get startDate(): Date {
    return this._start;
  }
  public set startDate(d: Date) {
    this._start = BaseItem.check_date(d);
  }

  public get endDate(): Date {
    return this._end;
  }
  public set endDate(d: Date) {
    this._end = BaseItem.check_date(d);
  }

  //
  public get personid(): string {
    return this._personid;
  }
  public set personid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._personid = s;
    } else {
      this._personid = null;
    }
  }

  //
  //
  public get groupeid(): string {
    return this._groupeid;
  }
  public set groupeid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._groupeid = s;
    } else {
      this._groupeid = null;
    }
  }

  //
  public get anneeid(): string {
    return this._anneeid;
  }
  public set anneeid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._anneeid = s;
    } else {
      this._anneeid = null;
    }
  }

  //
  //
  public get semestreid(): string {
    return this._semestreid;
  }
  public set semestreid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._semestreid = s;
    } else {
      this._semestreid = null;
    }
  }

  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null) && (this.anneeid !== null) &&
       (this.semestreid !== null) &&
      (this.groupeid !== null) && (this.personid !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
      oMap.departementid = this.departementid;
      oMap.anneeid = this.anneeid;
      oMap.semestreid = this.semestreid;
      oMap.groupeid = this.groupeid;
      oMap.personid = this.personid;
      oMap.startDate = this.startDate;
      oMap.endDate = this.endDate;
      oMap.firstname = this.firstname;
      oMap.lastname = this.lastname;
  }// to_insert_map
  public sort_func(p1:InfoData.IAffectation, p2:InfoData.IAffectation): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.fullname !== undefined) && (p1.fullname !== null)) {
                if ((p2.fullname !== undefined) && (p2.fullname !== null)) {
                    var s1 = p1.fullname;
                    var s2 = p2.fullname;
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
}// class Affectation
export = Affectation;
