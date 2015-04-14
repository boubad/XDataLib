//profil.ts
import ProfilViewModel = require('../data/model/profilviewmodel');
//
class ProfilClass extends ProfilViewModel {
	constructor(){
		super();
		this.title('Profil Utilisateur');
	}// constructor
	}// class ProfilClass
	var profil = new ProfilClass();
	export = profil;