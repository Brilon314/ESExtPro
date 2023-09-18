// CAPTURA EL NOMBRE DE LA TROPA EN FORMACIÓN DE AMBOS IMPERIOS

// var tropas = {
// 		"tropa": new Array(),
// 		"nivel": new Array(),
// 		"cant": new Array()
// 	};
// function data(){
	

// 	$(".nombretropas").each(function(index, obj) {
// 			tropas.tropa.push(obj.innerText);
// 			console.log(tropas.tropa);});

// 	$(".cantidadtropas").each(function(index, obj) {
// 			tropas.cant.push(obj.innerText);
// 			console.log(tropas.cant);});
	
// }
// data();
// function escogerobjetivo()
// {
// 	var imperios = new Array();
// 	var ciudades = new Array();

// 	// Auto ataque

// 	var autoAtack = LOCAL.getautoA();
// 	console.log(autoAtack);
// 	if(autoAtack){
// 			buscarciudades();
// 			console.log("busca ciudades");
// 			document.getElementById("form_tropas").submit();
// 			console.log("le da atacar");
// 		}
// 	window.addEventListener("keydown", function (event) 
// 	{ 
// 		console.log("algo del evento keydown");
// 		console.log(event)
// 		if (event.key==' '){
// 		  document.getElementById("form_tropas").submit();
// 		  console.log("le da atacat");
// 		}
// 	});





// 	$(".c_obj.ciudades.c_obj_v .lista2.escogerobjetivo.sortable tbody:has(tr.impar)>tr").each(function(index, obj){

// 		var idCiudad = parseInt($(obj.children[0]).find("a").html().split("#")[1]);

// 		var asedio = LOCAL.getAsedio(idCiudad);
// 		if(asedio != null && asedio.marcado)
// 			$(obj.children[0]).find("a").css("color", "#990000");

// 		var nombreCiudad = $(obj.children[0]).find("a").html().split("#")[0].trim();
// 		var region = parseInt($(obj.children[2]).html().trim().split("#")[1]);
// 		var idImperio = parseInt($(obj.children[1]).html().trim().split("#")[1]);
// 		var nombreImperio = $(obj.children[1]).html().trim().split("#")[0].trim();
// 		var clan = $(obj.children[3]).html().trim();
// 		var raza = $(obj.children[5]).html().trim();

// 		var exists = false;
// 		for(var i = 0; i < ciudades.length; i++)
// 			if(ciudades[i] == idCiudad)
// 			{
// 				exists = true;
// 				break;
// 			}

// 		if(!exists)
// 			ciudades.push(idCiudad);

// 		var imperio = null;
// 		for(var i = 0; i < imperios.length; i++)
// 			if(imperios[i].id == idImperio)
// 			{
// 				imperio = imperios[i];
// 				break;
// 			}

// 		if(imperio == null)
// 		{
// 			imperio = escogerobjetivo_generateImperio(idImperio, nombreImperio, raza, clan);
// 			escogerobjetivo_generateCiudad(imperio, idCiudad, nombreCiudad, region);
// 			imperios.push(imperio);
// 		}
// 		else
// 			escogerobjetivo_generateCiudad(imperio, idCiudad, nombreCiudad, region);

// 	});

// 	if(imperios.length != 0)
// 		API.setImperios(imperios, function() { API.getAtaques(ciudades, escogerobjetivo_updateInformation) });
// }

// function escogerobjetivo_updateInformation(ataques)
// {
// 	$(".c_obj.ciudades.c_obj_v .lista2.escogerobjetivo.sortable tbody:has(tr.impar)>tr").each(function(index, obj){

// 		var idCiudad = parseInt($(obj.children[0]).find("a").html().split("#")[1]);

// 		if(ataques[idCiudad] == undefined || ataques[idCiudad].length == 0)
// 			return;

// 		$(obj.children[0]).find("a").append(generateHTMLTropasIcon(idCiudad, ataques[idCiudad]));
// 	});

// 	UTIL.injectCode(function() {
// 		$('.ayudaExt').tooltip();
// 	});
// }

// function escogerobjetivo_generateImperio(id, nombre, raza, clan) {
// 	return {
// 		"id": id,
// 		"nombre": nombre,
// 		"raza": raza,
// 		"partida": GLOBAL.getPartida(),
// 		"ronda": GLOBAL.getRonda(),
// 		"clan": clan,
// 		"ciudades": new Array()
// 	};
// }

// function escogerobjetivo_generateCiudad(imperio, idCiudad, nombre, region) {
// 	imperio.ciudades.push({
// 		"idImperio": imperio.id,
// 		"partida": GLOBAL.getPartida(),
// 		"ronda": GLOBAL.getRonda(),
// 		"idCiudad": idCiudad,
// 		"nombre": nombre,
// 		"region": region
// 	});
// }
// function buscarciudades(){
// 	$(".c_obj.ciudades.c_obj_v .lista2.escogerobjetivo.sortable tbody:has(tr.impar)>tr").each(function(index, obj){

// 		var idCiudad = parseInt($(obj.children[0]).find("a").html().split("#")[1]);

// 		var asedio = LOCAL.getAsedio(idCiudad);
// 		if(asedio != null && asedio.marcado)
// 			$(obj.children[0]).find("a").css("color", "#990000");

// 		var nombreCiudad = $(obj.children[0]).find("a").html().split("#")[0].trim();
// 		var region = parseInt($(obj.children[2]).html().trim().split("#")[1]);
// 		var idImperio = parseInt($(obj.children[1]).html().trim().split("#")[1]);
// 		var nombreImperio = $(obj.children[1]).html().trim().split("#")[0].trim();
// 		var clan = $(obj.children[3]).html().trim();
// 		var raza = $(obj.children[5]).html().trim();

// 			$('#idcd').val(idCiudad);
// 			$('#idimpcd').val(idImperio);

// 	});
// }
