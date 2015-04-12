//semestre.ts
import InfoData = require("../../../infodata");
import IntervalItem = require('./intervalitem');
//
class Semestre extends IntervalItem implements InfoData.ISemestre {
  public anneeid: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this.anneeid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.anneeid != undefined) {
        this.anneeid = oMap.anneeid;
      }
    }// oMap
  } // constructor
  public get base_prefix(): string {
    return 'SEM';
  }
  public create_id():  string{
    var s = (this.startDate.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.anneeid + s + '-' + this.sigle.toUpperCase();
  }// create_id
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.departementid !== null) && (this.sigle !== null)
       && (this.anneeid !== null) &&
      (this.startDate !== null) && (this.endDate !== null) &&
      (this.startDate.getTime() <= this.endDate.getTime());
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.anneeid = this.anneeid;
  }// to_insert_map
  public get type(): string {
    return 'semestre';
  }
  public get collection_name(): string {
    return 'semestres';
  }
} // class Annee
export = Semestre;
