//userinfo.ts
/// <reference path='../../../../typings/durandal/durandal.d.ts'/>
//
import InfoData = require('../../../infodata');
import SessionObjectStore = require("../utils/sessionstore");
import Person = require('../domain/person');
import EtudiantPerson = require('../domain/etudperson');
import ProfPerson = require('../domain/profperson');
import OperPerson = require('../domain/operperson');
import AdminPerson = require('../domain/adminperson');
//
declare var window: any;
//
class UserInfo extends SessionObjectStore {
  //
  constructor() {
    super();
  }// constructor
  public get description():string {
    return this.get_value('description');
  }
  public set description(s:string){
    this.store_value('description',s);
  }
  public get phone():string {
    return this.get_value('phone');
  }
  public set phone(s:string){
    this.store_value('phone',s);
  }
  public get email():string {
    return this.get_value('email');
  }
  public set email(s:string){
    this.store_value('email',s);
  }
  public get fullname():string {
    return this.get_value('fullname');
  }
  public set fullname(s:string){
    this.store_value('fullname',s);
  }
  public get lastname():string {
    return this.get_value('lastname');
  }
  public set lastname(s:string){
    this.store_value('lastname',s);
  }
  public get firstname():string {
    return this.get_value('firstname');
  }
  public set firstname(s:string){
    this.store_value('firstname',s);
  }
  public get photoUrl():string{
    return this.get_value('photoUrl');
  }
  public set photoUrl(s:string){
    this.store_value('photoUrl',s);
  }
  public get groupeid(): string {
    return this.get_value('groupeid');
  }
  public set groupeid(s:string){
    this.store_value('groupeid',s);
  }
  public get matiereid(): string {
    return this.get_value('matiereid');
  }
  public set matiereid(s:string){
    this.store_value('matiereid',s);
  }
  public get uniteid(): string {
    return this.get_value('uniteid');
  }
  public set uniteid(s:string){
    this.store_value('uniteid',s);
  }
  public get semestreid(): string {
    return this.get_value('semestreid');
  }
  public set semestreid(s:string){
    this.store_value('semestreid',s);
  }
  public get anneeid(): string {
    return this.get_value('anneeid');
  }
  public set anneeid(s:string){
    this.store_value('anneeid',s);
  }
  public get departementid(): string {
    return this.get_value('departementid');
  }
  public set departementid(s:string){
    this.store_value('departementid',s);
  }
  public get personid(): string {
    return this.get_value('personid');
  }
  public set personid(s:string){
    this.store_value('personid',s);
  }
  public get personrev():string {
    return this.get_value('personrev');
  }
  public set personrev(s:string) {
    this.store_value('personrev',s);
  }
  //
  public get person(): InfoData.IPerson {
    var oMap = this.get_value('person');
    if (oMap === null){
      return null;
    }
    var t = ((oMap.type !== undefined) && (oMap.type !== null)) ? oMap.type : null;
    if (t === null){
      return null;
    }
    if (t == 'person') {
      return new Person(oMap);
    } else if (t == 'etudperson') {
      return new EtudiantPerson(oMap);
    } else if (t == 'profperson') {
      return new ProfPerson(oMap);
    } else if (t == 'operperson') {
      return new OperPerson(oMap);
    } else if (t == 'adminperson') {
      return new AdminPerson(oMap);
    }
    return null;
  }
  public set person(pPers: InfoData.IPerson) {
    var p: InfoData.IPerson = (pPers !== undefined) ? pPers : null;
    this.personid = null;
    this.personrev = null;
    this.departementid = null;
    this.anneeid = null;
    this.semestreid = null;
    this.uniteid = null;
    this.matiereid = null;
    this.groupeid = null;
    this.firstname = null;
    this.lastname = null;
    this.fullname = null;
    this.photoUrl = null;
    this.email = null;
    this.phone = null;
    this.description = null;
    if ((p !== null) && (p.id !== null)) {
      var id = p.id;
      this.personid = id;
      this.personrev = p.rev;
      this.firstname = p.firstname;
      this.lastname = p.lastname;
      this.fullname = p.fullname;
      this.email = p.email;
      this.phone = p.phone;
      this.description = p.description;
    }// pPers
  }
}// class UserInfo
//
export = UserInfo;
