// person.ts
import InfoData = require('../../../infodata');
//
import BaseItem = require('./baseitem');
import MyCrypto = require('./mycrypto');
//
var cc = new MyCrypto();
//
class Person extends BaseItem implements InfoData.IPerson {
  private _user: string;
  private _pass: string;
  private _first: string;
  private _last: string;
  private _email: string;
  private _phone: string;
  private _roles: string[];
  private _deps: string[];
  private _annees: string[];
  private _semestres: string[];
  private _matieres: string[];
  private _unites: string[];
  private _groupes: string[];
  //
  constructor(oMap?: any) {
    super(oMap);
    this._user = null;
    this._pass = null;
    this._first = null;
    this._last = null;
    this._email = null;
    this._phone = null;
    this._roles = [];
    this._deps = [];
    this._annees = [];
    this._semestres = [];
    this._matieres = [];
    this._unites = [];
    this._groupes = [];
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.username !== undefined) {
        this.username = oMap.username;
      }
      if (oMap.password !== undefined) {
        this.password = oMap.password;
      }
      if (oMap.firstname !== undefined) {
        this.firstname = oMap.firstname;
      }
      if (oMap.lastname !== undefined) {
        this.lastname = oMap.lastname;
      }
      if (oMap.email !== undefined) {
        this.email = oMap.email;
      }
      if (oMap.phone !== undefined) {
        this.phone = oMap.phone;
      }
      if (oMap.departementids !== undefined) {
        this.departementids = oMap.departementids;
      } //
      if (oMap.roles !== undefined) {
        this.roles = oMap.roles;
      } //
      if (oMap.anneeids !== undefined) {
        this.anneeids = oMap.anneeids;
      } //
      if (oMap.semestreids !== undefined) {
        this.semestreids = oMap.semestreids;
      } //
      if (oMap.uniteids !== undefined) {
        this.uniteids = oMap.uniteids;
      } //
      if (oMap.matiereids !== undefined) {
        this.matiereids = oMap.matiereids;
      } //
      if (oMap.groupeids !== undefined) {
        this.groupeids = oMap.groupeids;
      } //
    } // oMap
  } // constructor
  //
  public get base_prefix(): string {
    return 'PER';
  }
  public get index_name(): string {
    return 'persons/by_names';
  }
  public create_id(): string {
    return this.base_prefix + '-' + this.username;
  }// create_id
  //
  public get departementids(): string[] {
    return this._deps;
  }
  public set departementids(s: string[]) {
    this._deps = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }
  public add_departementid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._deps === undefined) || (this._deps === null)) {
        this._deps = [];
      }
      BaseItem.array_add(this._deps, id);
    }
  }
  public remove_departementid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._deps !== undefined) && (this._deps !== null) &&
        (this._deps.length > 0)) {
        BaseItem.array_remove(this._deps, id);
      }
    }
  }
  //
  public get groupeids(): string[] {
    return this._groupes;
  }
  public set groupeids(s: string[]) {
    this._groupes = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }
  public add_groupeid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._groupes === undefined) || (this._groupes === null)) {
        this._groupes = [];
      }
      BaseItem.array_add(this._groupes, id);
    }
  }
  public remove_groupeid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._groupes !== undefined) && (this._groupes !== null) &&
        (this._groupes.length > 0)) {
        BaseItem.array_remove(this._groupes, id);
      }
    }
  }
  //
  public get anneeids(): string[] {
    return this._annees;
  }
  public set anneeids(s: string[]) {
    this._annees = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }
  public add_anneeid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._annees === undefined) || (this._annees === null)) {
        this._annees = [];
      }
      BaseItem.array_add(this._annees, id);
    }
  }
  public remove_anneeid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._annees !== undefined) && (this._annees !== null) &&
        (this._annees.length > 0)) {
        BaseItem.array_remove(this._annees, id);
      }
    }
  }
  //
  public get semestreids(): string[] {
    return this._semestres;
  }
  public set semestreids(s: string[]) {
    this._semestres = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }

  public add_semestreid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._semestres === undefined) || (this._semestres === null)) {
        this._semestres = [];
      }
      BaseItem.array_add(this._semestres, id);
    }
  }
  public remove_semestreid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._semestres !== undefined) && (this._semestres !== null) &&
        (this._semestres.length > 0)) {
        BaseItem.array_remove(this._semestres, id);
      }
    }
  }
  //
  public get uniteids(): string[] {
    return this._unites;
  }
  public set uniteids(s: string[]) {
    this._unites = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }
  public add_uniteid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._unites === undefined) || (this._unites === null)) {
        this._unites = [];
      }
      BaseItem.array_add(this._unites, id);
    }
  }
  public remove_uniteid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._unites !== undefined) && (this._unites !== null) &&
        (this._unites.length > 0)) {
        BaseItem.array_remove(this._unites, id);
      }
    }
  }
  //
  public get matiereids(): string[] {
    return this._matieres;
  }
  public set matiereids(s: string[]) {
    this._matieres = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }

  public add_matiereid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._matieres === undefined) || (this._matieres === null)) {
        this._matieres = [];
      }
      BaseItem.array_add(this._matieres, id);
    }
  }
  public remove_matiereid(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._matieres !== undefined) && (this._matieres !== null) &&
        (this._matieres.length > 0)) {
        BaseItem.array_remove(this._matieres, id);
      }
    }
  }
  //

  //
  public get roles(): string[] {
    return this._roles;
  }
  public set roles(s: string[]) {
    this._roles = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : [];
  }

  public add_role(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._roles === undefined) || (this._roles === null)) {
        this._roles = [];
      }
      BaseItem.array_add(this._roles, id);
    }
  }
  public remove_role(id: string): void {
    if ((id !== undefined) && (id !== null) &&
      (id.trim().length > 0)) {
      if ((this._roles !== undefined) && (this._roles !== null) &&
        (this._roles.length > 0)) {
        BaseItem.array_remove(this._roles, id);
      }
    }
  }
  //
  public reset_password(): void {
    if (this.username !== null) {
      this.password = cc.md5(this.username);
    } else {
      this.password = null;
    }
  }
  public change_password(ct: string): void {
    if ((ct === undefined) || (ct === null)) {
      this.password = null;
    } else {
      var v = null;
      var x = ct.trim();
      if (x.length > 0) {
        v = cc.md5(ct);
      }
      this.password = v;
    }
  }
  public check_password(ct: string): boolean {
    if ((ct === undefined) || (ct === null)) {
      if (this.password === null) {
        return true;
      } else {
        return false;
      }
    }
    var v = cc.md5(ct);
    return (this.password == v);
  } // check_password
  //
  public get collection_name(): string {
    return "persons";
  }
  public get type(): string {
    return "person";
  }
  //
  public get username(): string {
    return this._user;
  }
  public set username(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._user = s.trim().toLowerCase();
    } else {
      this._user = null;
    }
  }
  //
  public get lastname(): string {
    return this._last;
  }
  public set lastname(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._last = s.trim().toUpperCase();
    } else {
      this._last = null;
    }
  }
  //
  public get firstname(): string {
    return this._first;
  }
  public set firstname(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      var ss = s.trim();
      var n = ss.length;
      if (n > 1) {
        this._first =
        ss.substr(0, 1).toUpperCase() + ss.substr(1, n - 1).toLowerCase();
      } else {
        this._first = ss.toUpperCase();
      }
    } else {
      this._first = null;
    }
  }
  //
  public get fullname(): string {
    var s = '';
    if (this.lastname !== null) {
      s = this.lastname;
    }
    if (this.firstname != null) {
      s = s + ' ' + this.firstname;
    }
    s = s.trim();
    return (s.length > 0) ? s : null;
  } // fullname

  //
  public get password(): string {
    return this._pass;
  }
  public set password(s: string) {
    if (s !== undefined) {
      this._pass = s;
    } else {
      this._pass = null;
    }
  }

  //
  public get email(): string {
    return this._email;
  }
  public set email(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._email = s.trim();
    } else {
      this._email = null;
    }
  }

  public get phone(): string {
    return this._phone;
  }
  public set phone(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._phone = s.trim();
    } else {
      this._phone = null;
    }
  }

  //
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.username = this.username;
    oMap.password = this.password;
    oMap.firstname = this.firstname;
    oMap.lastname = this.lastname;
    oMap.email = this.email;
    oMap.phone = this.phone;
    oMap.roles = this.roles;
    oMap.departementids = this.departementids;
    oMap.uniteids = this.uniteids;
    oMap.matiereids = this.matiereids;
    oMap.anneeids = this.anneeids;
    oMap.semestreids = this.semestreids;
    oMap.groupeids = this.groupeids;
  } // to_insert_map
  public get is_storeable(): boolean {
    return (this.username !== null) && (this.firstname !== null) &&
      (this.lastname !== null);
  }
  public hasrole(r: string): boolean {
    return BaseItem.array_contains(this._roles, r);
  } // hasrole_
  public get is_admin(): boolean {
    return (this.hasrole('super') || this.hasrole('admin'));
  }
  public get is_oper(): boolean {
    return (this.is_admin) || this.hasrole('oper');
  }
  public get is_prof(): boolean {
    return this.hasrole('prof');
  }
  public get is_etud(): boolean {
    return this.hasrole('etud');
  }
  public get is_reader(): boolean {
    return this.hasrole('reader');
  }
  public get is_super(): boolean {
    return this.hasrole('super');
  }
} // class Person
export = Person;
