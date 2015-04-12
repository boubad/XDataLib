//etudevent.ts
//
import InfoData = require('../../../infodata');
//
import BaseItem = require('./baseitem');
import BaseEvent = require('./baseevent');
//
class EtudEvent extends BaseEvent implements InfoData.IEtudEvent {
  //
  private _aff: string;
  private _evt: string;
  private _note: number;
  private _etud: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._aff = null;
    this._evt = null;
    this._note = null;
    this._etud = null;
    this.firstname = null;
    this.lastname = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.etudaffectationid !== undefined) {
        this.etudaffectationid = oMap.etudaffectationid;
      }
      if (oMap.etudiantid !== undefined) {
        this.etudiantid = oMap.etudiantid;
      }
      if (oMap.groupeeventid !== undefined) {
        this.groupeeventid = oMap.groupeeventid;
      }
      if (oMap.note !== undefined) {
        this.note = oMap.note;
      }
    }// oMap
  }// constructor
  public get base_prefix(): string {
    return 'EVT';
  }
  public create_id(): string {
    return this.base_prefix + '-' + this.groupeeventid + '-' + this.etudiantid;
  }// create_id
  public get type(): string {
    return 'etudevent';
  }
  public get collection_name(): string {
    return 'etudevents';
  }
  //
  public get etudaffectationid(): string {
    return this._aff;
  }
  public set etudaffectationid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._aff = s;
    } else {
      this._aff = null;
    }
  }
  //
  public get groupeeventid(): string {
    return this._evt;
  }
  public set groupeeventid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._evt = s;
    } else {
      this._evt = null;
    }
  }
  //
  public get etudiantid(): string {
    return this._etud;
  }
  public set etudiantid(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._etud = s;
    } else {
      this._etud = null;
    }
  }
  //
  public get note(): number {
    return this._note;
  }
  public set note(s: number) {
    if ((s !== undefined) && (s !== null)) {
      this._note = s;
    } else {
      this._note = null;
    }
  }

  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null) && (this.anneeid !== null)
      && (this.semestreid !== null) &&
      (this.uniteid !== null) && (this.matiereid !== null) &&
      (this.groupeid !== null) &&
      (this.genre !== null) && (this.date !== null) &&
      (this.etudaffectationid !== null) && (this.etudiantid !== null) &&
      (this.lastname !== null) && (this.firstname !== null) &&
      (this.groupeeventid !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.etudaffectationid = this.etudaffectationid;
    oMap.groupeeventid = this.groupeeventid;
    oMap.etudiantid = this.etudiantid;
    oMap.note = this.note;
  }// to_insert_map
}// class EtudEvent
export = EtudEvent;
