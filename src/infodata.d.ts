//infodata.d.ts
/// <reference path='../typings/bluebird/bluebird.d.ts' />
//
export interface IObjectStore {
  get_value : (key:string) => any;
  store_value: (key:string, value:any) => any;
  remove_value : (key: string) => any;
}// interface IObjectStore
export interface IMenuDesc {
  refer: string;
  title: string;
  desc?: string;
  img_source?: string;
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
  description:string;
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
  create_item : (oMap?:any) => IBaseItem;
  convert_items: (dd: any[]) => IBaseItem[]
}// interface IItemGenerator
export interface ISigleNameItem extends IBaseItem{
  sigle:string;
  name:string;
}// interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {

}// interface ISigleNameItem
export interface IDatabaseManager {
  get_item_by_id: (id: string) => Promise<IBaseItem>;
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
