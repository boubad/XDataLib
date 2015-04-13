//dataservice.ts
//
import InfoData = require('../../../infodata');
import PouchDatabase = require('./pouchdb/pouchdatabase');
//
class DataService extends PouchDatabase {
  constructor(xurl?: string, gen?: InfoData.IItemGenerator){
    super(xurl,gen);
  }
}// class DataService
var dataService = new DataService();
export = dataService;
