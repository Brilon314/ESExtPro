class estrellas {
	puedoconstruir(idEdificio,edificios,estrella,recursosActuales){
		var edificio      = edificios[idEdificio];
		var recurso       = edificio.getCosto()["recurso"];
		var costoOro      = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["oro"];
		var costoRecurso  = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["cantidadRecurso"];
		if (costoOro>recursosActuales["ORO"]||costoRecurso>recursosActuales[recurso]||this.requisitoEstrella(idEdificio,edificios,estrella,recursosActuales))
			return false;
		else{
			return true;
		}
	}
	costoEstrella(construido,estrella){
		var costo = 0;
		for(var i = (construido+1); i <= estrella; i++)
			costo += i;
		return costo;
	}
	requisitoEstrella(idEdificio,edificios,estrella,recursosActuales){
		if(EDIFICIOS_REQUERIDOS[idEdificio]==null)
			return false;
		if(estrella>edificios[EDIFICIOS_REQUERIDOS[idEdificio]].getConstruido())
			return true;
		return false;
	}
}



// class estrellas {
// 	puedoconstruir(edificio,estrella,recursosActuales){
// 		var recurso       = edificio.getCosto();  //["recurso"]
// 		var costoOro      = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["oro"];
// 		var costoRecurso  = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["cantidadRecurso"];
// 		if (costoOro>recursosActuales["ORO"]||costoRecurso>recursosActuales[recurso])
// 			return false;
// 		else{
// 			return true;
// 		}
// 	}
// 	costoEstrella(construido,estrella){
// 		var costo = 0;
// 		for(var i = (construido+1); i <= estrella; i++)
// 			costo += i;
// 		return costo;
// 	}
// }