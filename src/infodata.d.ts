//infodata.d.ts
/// <reference path='../typings/bluebird/bluebird.d.ts' />
//
export interface IObjectStore {
  get_value: (key: string) => any;
  store_value: (key: string, value: any) => any;
  remove_value: (key: string) => any;
}// interface IObjectStore
export interface IMenuDesc {
  title?: string;
  desc?: string;
  image?: string;
  refer?: string;
  parent?:any;
  proc?: (arg?:any) => any;
  //
  execute?: () => void;
}// interface IMenuDesc

export interface IElementDesc {
  id: string;
  text: string;
  url?: string;
  rev?: string;
  avatardocid?: string;
  avatarid?: any;
  personid?: string;
  startDate?: Date;
  endDate?: Date;
  hasUrl: boolean;
}
export interface IBaseItem {
  id: string;
  rev: string;
  attachments: any;
  type: string;
  collection_name: string;
  index_name: string;
  avatarid: string;
  description: string;
  //
  create_id: () => string;
  base_prefix: string;
  is_storeable: boolean;
  to_insert_map: (oMap: any) => void;
  to_fetch_map: (oMap: any) => void;
  sort_func: (p1: IBaseItem, p2: IBaseItem) => number;
  //
  sigle?: string;
  name?: string;
  departementid?: string;
  anneeid?: string;
  semestreid?: string;
  uniteid?: string;
  matiereid?: string;
  groupeid?: string;
  startDate?: Date;
  endDate?: Date;
  genre?: string;
  mat_module?: string;
  coefficient?: number;
  ecs?: number;
  personid?: string;
  fullname?: string;
  date?: Date;
  location?: string;
  startTime?: Date;
  note?: number;
  status?: string;
  enseignantid?: string;
  etudiantid?: string;
  profaffectationid?: string;
  etudaffectationid?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  departementids?: string[];
  anneeids?: string[];
  semestreids?: string[];
  matiereids?: string[];
  uniteids?: string[];
  groupeids?: string[];
  dossier?: string;
  sexe?: string;
  birthDate?: Date;
  ville?: string;
  etablissement?: string;
  serieBac?: string;
  optionBac?: string;
  mentionBac?: string;
  etudesSuperieures?: string;
  //
  reset_password?: () => void;
  check_password?: (ct: string) => boolean;
  change_password?: (ct: string) => void;
}// interface IBaseItem
export interface IItemGenerator {
  create_item: (oMap?: any) => IBaseItem;
  convert_items: (dd: any[]) => IBaseItem[]
}// interface IItemGenerator
export interface ISigleNameItem extends IBaseItem {
  sigle: string;
  name: string;
}// interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {

}// interface ISigleNameItem
export interface IDepartementChildItem extends IBaseItem {
  departementid: string;
}
export interface IDepartementSigleNameItem extends IDepartementChildItem {
  sigle: string;
  name: string;
}
export interface IUnite extends IDepartementSigleNameItem {

}
export interface IGroupe extends IDepartementSigleNameItem {

}
export interface IMatiere extends IDepartementSigleNameItem {
  uniteid:string;
  genre: string;
  mat_module: string;
  coefficient: number;
  ecs: number;
}
export interface IIntervalItem extends IDepartementSigleNameItem {
  startDate: Date;
  endDate: Date;
}
export interface IAnnee extends IIntervalItem {
}
export interface ISemestre extends IIntervalItem {
  anneeid: string;
}
export interface IPerson extends IBaseItem {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  roles: string[];
  departementids: string[];
  anneeids: string[];
  semestreids: string[];
  matiereids: string[];
  uniteids: string[];
  groupeids: string[];
  //
  fullname: string;
  //
  reset_password: () => void;
  check_password: (ct: string) => boolean;
  change_password: (ct: string) => void;
  //
  hasrole: (r: string) => boolean;
  is_super: boolean;
  is_admin: boolean;
  is_oper: boolean;
  is_prof: boolean;
  is_etud: boolean;
  is_reader: boolean;
  //
  add_role: (r: string) => void;
  remove_role: (r: string) => void;
  //
  add_departementid: (id: string) => void;
  remove_departementid: (id: string) => void;
  add_anneeid: (id: string) => void;
  remove_anneeid: (id: string) => void;
  add_semestreid: (id: string) => void;
  remove_semestreid: (id: string) => void;
  add_uniteid: (id: string) => void;
  remove_uniteid: (id: string) => void;
  add_matiereid: (id: string) => void;
  remove_matiereid: (id: string) => void;
  add_groupeid: (id: string) => void;
  remove_groupeid: (id: string) => void;
}// interface IPerson
export interface IProfPerson extends IPerson {

}// interface IProfPerson
export interface IOperPerson extends IPerson {

}// interface IOperPerson
export interface IAdminPerson extends IPerson {

}// interface IAdminPerson
export interface IEtudiantPerson extends IPerson {
  dossier: string;
  sexe: string;
  birthDate: Date;
  ville: string;
  etablissement: string;
  serieBac: string;
  optionBac: string;
  mentionBac: string;
  etudesSuperieures: string;
  //
  isMale: boolean;
  isFeminin: boolean;
}// interface IEtudiantPerson
export interface IDepartementPerson extends IDepartementChildItem {
  personid: string;
  lastname: string;
  firstname: string;
  fullname: string;
}// interface IDepartementPerson
//
export interface IEtudiant extends IDepartementPerson {
}// interface IEtudiant
export interface IEnseignant extends IDepartementPerson {
}// interface IEnseignant
export interface IOperator extends IDepartementPerson {
}// interface IOperator
export interface IAdministrator extends IDepartementPerson {
}// interface IOperator
//
export interface IAffectation extends IDepartementChildItem {
  semestreid: string;
  groupeid: string;
  anneeid: string;
  personid: string;
  lastname: string;
  firstname: string;
  fullname: string;
  startDate: Date;
  endDate: Date;
} // interface IAffectation
export interface IEtudAffectation extends IAffectation {
  etudiantid: string;
}// interface IEtudAffectation
export interface IProfAffectation extends IAffectation {
  uniteid: string;
  matiereid: string;
  enseignantid: any;
}// interface IProfAffectation
//
export interface IBaseEvent extends IDepartementChildItem {
  anneeid: string;
  semestreid: string;
  uniteid: string;
  matiereid: string;
  groupeid: string;
  personid: string;
  date: Date;
  genre: string;
  status: string;
  lastname: string;
  firstname: string;
  fullname: string;
  //
}// interface IBaseEvent
//
export interface IGroupeEvent extends IBaseEvent {
  profaffectationid: string;
  enseignantid: string;
  name: string;
  location: string;
  startTime: Date;
  endTime: Date;
  coefficient: number;
}// interface IGroupeEvent
export interface IEtudEvent extends IBaseEvent {
  etudaffectationid: string;
  groupeeventid: string;
  note: number;
  etudiantid: string;
}// interface IEtudEvent
//
export interface IDatabaseManager {
  check_admin: () => Promise<any>;
  get_item_by_id: (id: string,bAttachments?:boolean) => Promise<IBaseItem>;
  get_items_array: (ids: string[]) => Promise<IBaseItem[]>;
  maintains_one_item: (item: IBaseItem) => Promise<IBaseItem>;
  maintains_items: (items: IBaseItem[]) => Promise<any>;
  remove_items: (items: IBaseItem[]) => Promise<any>
  remove_one_item: (item: IBaseItem) => Promise<any>;
  find_person_by_username: (username: string) => Promise<IBaseItem>;
  maintains_attachment: (item: IBaseItem, attachmentId: string,
  attachment: any, type: string) => Promise<any>;
  get_docid_attachment: (docid: string, attachmentId: string) => Promise<any>;
  remove_attachment: (item: IBaseItem, attachmentId: string) => Promise<any>;
  find_elements_range: (viewName: string, startKey?: any, endKey?: any,
  skip?: number, limit?: number,
  descending?: boolean, bIncludeEnd?: boolean,
  bDoc?: boolean, bAttach?: boolean) => Promise<IElementDesc[]>;
  //
}// interface IDatabaseManager
