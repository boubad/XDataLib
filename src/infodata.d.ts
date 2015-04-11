//infodata.d.ts
/// <reference path='../typings/q/Q.d.ts' />
//
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
  //
  check_url: (server?: any) => Q.Promise<string>
}
export interface IBaseItem {
  id: string;
  rev: string;
  attachments: any;
  type: string;
  collection_name: string;
  index_name: string;
  avatarid: string;
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
  description?: string;
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
export interface IDatabaseManager {
  create_item: (oMap: any) => IBaseItem;
  get_item_by_id: (id: string) => Q.Promise<IBaseItem>;
  get_items_array: (ids: string[]) => Q.Promise<IBaseItem[]>;
  maintains_one_item: (item: IBaseItem) => Q.Promise<IBaseItem>;
  maintains_items: (items: IBaseItem[]) => Q.Promise<IBaseItem[]>;
  remove_items: (items: IBaseItem[]) => Q.Promise<boolean>
  remove_one_item: (item: IBaseItem) => Q.Promise<boolean>;
  find_person_by_username: (username: string) => Q.Promise<IBaseItem>;
  maintains_attachment: (item: IBaseItem, attachmentId: string,
  attachment: any, type: string) => Q.Promise<boolean>;
  get_attachment: (item: IBaseItem, attachmentId: string) => Q.Promise<any>;
  get_docid_attachment: (docid: string, attachmentId: string) => Q.Promise<any>;
  remove_attachment: (item: IBaseItem, attachmentId: string) => Q.Promise<boolean>;
  find_elements_range: (viewName: string, startKey?: any, endKey?: any,
  skip?: number, limit?: number,
  descending?: boolean, bIncludeEnd?: boolean,
  bDoc?: boolean, bAttach?: boolean) => Q.Promise<IElementDesc[]>;
  //
}// interface IDatabaseManager
