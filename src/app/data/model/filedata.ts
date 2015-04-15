//filedata.ts
//
/// <reference path='../../../../typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
//
class FileData {
	//
	public file:KnockoutObservable<File>;
	public objectURL:KnockoutObservable<string>;
	public binaryString:KnockoutObservable<string>;
	public text:KnockoutObservable<string>;
	public dataURL:KnockoutObservable<string>;
	public arrayBuffer:KnockoutObservable<ArrayBuffer>;
	public base64String:KnockoutObservable<string>;
	public name:KnockoutObservable<string>;
	public type:KnockoutObservable<string>;
	//
	constructor(){
			this.file = ko.observable(null);
			this.objectURL = ko.observable(null);
			this.binaryString = ko.observable(null);
			this.text = ko.observable(null);
			this.dataURL = ko.observable(null);
			this.arrayBuffer = ko.observable(null);
			this.base64String = ko.observable(null);
			this.name = ko.observable(null);
			this.type = ko.observable(null);
		}// constructor
	}// class FileData
	export = FileData;