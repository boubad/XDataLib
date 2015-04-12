//baseevent.ts
import InfoData = require('../../../infodata');
//
import BaseItem = require('./baseitem');
import DepartementChild = require('./departementchild');
//
class BaseEvent extends DepartementChild implements InfoData.IBaseEvent {
  //
  private _anneeid: string;
  private _semestreid: string;
  private _groupeid: string;
  private _personid: string;
  private _date: Date;
  private _uniteid: string;
  private _matiereid: string;
  private _genre: string;
  private _status: string;
  public firstname:string;
  public lastname:string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._anneeid = null;
    this._semestreid = null;
    this._groupeid = null;
    this._personid = null;
    this._date = null;
    this._uniteid = null;
    this._matiereid = null;
    this._genre = null;
    this._status = null;
    this.lastname = null;
    this.firstname = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.firstname !== undefined){
        this.firstname = oMap.firstname;
      }
      if (oMap.lastname !== undefined){
        this.lastname = oMap.lastname;
      }
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
      if (oMap.uniteid !== undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.matiereid !== undefined) {
        this.matiereid = oMap.matiereid;
      }
      if (oMap.genre !== undefined) {
        this.genre = oMap.genre;
      }
      if (oMap.status !== undefined) {
        this.status = oMap.status;
      }
      if (oMap.date !== undefined) {
        this.date = oMap.date;
      }

    }// oMap
  }// constructor
  //
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
  public get status(): string {
    return this._status;
  }
  public set status(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._status = s.trim().toLowerCase();
    } else {
      this._status = null;
    }
  }

  //
  public get genre(): string {
    return this._genre;
  }
  public set genre(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._genre = s.trim().toLowerCase();
    } else {
      this._genre = null;
    }
  }

  //
  public get date(): Date {
    return this._date;
  }
  public set date(d: Date) {
    this._date = BaseItem.check_date(d);
  }

  //
  public get matiereid(): string {
    return this._matiereid;
  }
  public set matiereid(s:string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
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
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._uniteid = s;
    } else {
      this._uniteid = null;
    }
  }

  //
  public get personid():string {
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
      (this.departementid !== null) && (this.anneeid !== null)
       && (this.semestreid !== null) &&
      (this.uniteid !== null) && (this.matiereid !== null) &&
       (this.groupeid !== null) &&
      (this.genre !== null) && (this.date !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.anneeid = this.anneeid;
      oMap.semestreid = this.semestreid;
      oMap.groupeid = this.groupeid;
      oMap.personid = this.personid;
      oMap.date = this.date;
      oMap.genre = this.genre;
      oMap.uniteid = this.uniteid;
      oMap.matiereid = this.matiereid;
      oMap.status = this.status;
      oMap.firstname = this.firstname;
      oMap.lastname = this.lastname;
  }// to_insert_map
  public sort_func(p1:InfoData.IBaseEvent, p2:InfoData.IBaseEvent): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.date !== undefined) && (p1.date !== null)) {
                if ((p2.date !== undefined) && (p2.date !== null)) {
                    var s1 = Date.parse(p1.date.toString());
                    var s2 = Date.parse(p2.date.toString());
                    if (s1 < s2){
                      vRet = 1;
                    } else if (s1 > s2){
                      vRet = -1;
                    } else {
                      vRet = 0;
                    }
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
export = BaseEvent;
