//menudesc.ts
/// <reference path='../../../infodata.d.ts' />
/// <reference path="../../../../typings/durandal/durandal.d.ts"/>
//
import InfoData = require('../../../infodata');
import shell = require('../../viewmodels/shell');
var router:DurandalRouter  = shell.router;
//
class MenuDesc implements InfoData.IMenuDesc {
	//
	public title: string;
	public refer: string;
  	public desc: string;
  	public image: string;
  	public name: string;
  	public parent:any;
  	public proc: (arg?:any) => any;
	//
	constructor(xrefer:string,xtitle?:string,img?:string,pParent?:any, 
		xproc?:(arg?:any)=>any,xdesc?:string){
		this.title = (xtitle !== undefined) ? xtitle : null;
		this.refer = (xrefer !== undefined) ? xrefer : null;
		this.desc = (xdesc !== undefined) ? xdesc : null;
		this.image = (img !== undefined) ? img : null;
		this.parent = (pParent !== undefined) ? pParent : null;
		this.proc = (xproc !== undefined) ? xproc : null;
	}// constructor
	public execute(): void {
		if ((this.proc !== undefined) && (this.proc !== null) &&
			(this.parent !== undefined) && (this.parent !== null)){
				this.proc(this.parent);
			} else if ((this.refer !== undefined) && (this.refer !== null) &&
				(router !== undefined) && (router !== null)){
				router.navigate('#' + this.refer);
			}
		}// execute
}// class MenuDesc
export = MenuDesc;