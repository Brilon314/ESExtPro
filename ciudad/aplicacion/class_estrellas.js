class estrellas {
	puedoconstruir(edificio,estrella,recursosActuales){
		var recurso       = edificio.getCosto()["recurso"]
		console.log('recurso:', recurso);
		var costoOro      = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["oro"];
		console.log('costoOro:', costoOro);
		var costoRecurso  = this.costoEstrella(edificio.getConstruido(),estrella)*edificio.getCosto()["cantidadRecurso"];
		console.log('costoRecurso:', costoRecurso);
		if (costoOro>recursosActuales["ORO"]||costoRecurso>recursosActuales[recurso])
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
}