// ------------- Muestra los puntos hechos en el día ------------- //

var valrank = parseInt(document.querySelector("#datos > tbody > tr:nth-child(4) > td:nth-child(3)").innerText);
console.log(valrank);
var valactual = parseInt(document.querySelector("#mirank > span.valor").innerHTML);
console.log(valactual);
var puntosdia =valactual - valrank;
console.log(puntosdia);

$("#datos > tbody > tr:nth-child(4)").append(`<td><b>Puntos del día: </b><div align="right" style="font-size: x-large"> ${puntosdia}</div></td>`);

// ------------- Fin ------------- //


//GUARDAR NOMBRE IMPERIO e ID
var info = $("#contenido .titulo").html().trim().toUpperCase();
info = info.replace("TU IMPERIO: ", "");
info = info.split("#");
var id = parseInt(info[1]);
var nombre = info[0].trim();
// fin GUARDAR NOMBRE IMPERIO e ID

//CARGA VALOR
var valor = parseInt(document.querySelector(".valor").innerText.replace(".", ""));
if(valor > 0)
	LOCAL.setValor(valor);
//fin CARGA VALOR

// OBTIENE DATOS PARA BOTON TODAS LAS CIUDADES

// Guarda todos los enlaces a las ciudades en este array
const cityLinks = [];

// Encuentra la tabla que contiene la lista de ciudades.
const table = document.querySelector("#contenido > table:nth-child(8) > tbody");

if (table) {
  // Obtiene todas las filas de la tabla
  const rows = table.querySelectorAll("tr.impar, tr.par");

  // Recorre cada fila
  rows.forEach((row) => {
    // Encuentra la celda que tiene el enlace a la ciudad
    const cellWithLink = row.querySelector("td:nth-child(3)");

    if (cellWithLink) {
      // Obtiene el enlace real
      const link = cellWithLink.querySelector("a");

      if (link) {
        // Añade el enlace al array
        cityLinks.push(link.href);
      }
    }
  });
} else {
  console.log("No se encontró la tabla.");
}
const table2 = document.querySelector("#contenido > table:nth-child(7)");

if (table2) {
  // Obtiene todas las filas de la tabla
  const rows = table2.querySelectorAll("tr.impar, tr.par");

  // Recorre cada fila
  rows.forEach((row) => {
    // Encuentra la celda que tiene el enlace a la ciudad
    const cellWithLink = row.querySelector("td:nth-child(3)");

    if (cellWithLink) {
      // Obtiene el enlace real
      const link = cellWithLink.querySelector("a");

      if (link) {
        // Añade el enlace al array
        cityLinks.push(link.href);
      }
    }
  });
} else {
  console.log("No se encontró la tabla.");
}

// FIN OBTIENE DATOS PARA BOTON TODAS LAS CIUDADES

var raza = $($("#datos tr td")[2]).html();
var clan = "";
if($($("#datos td")[5]).html().match(/\(...\)/g) != null && $($("#datos td")[5]).html().match(/\(...\)/g).length == 1)
	clan = $($("#datos td")[5]).html().match(/\(...\)/g)[0].replace("(","").replace(")","");

var ciudades = new Array();
var heroes = new Array();
var produccion = {};
//#datos > tbody > tr:nth-child(3) > td:nth-child(3)
var ib = $("#datos > tbody > tr:nth-child(3) > td:nth-child(3)")[0].outerText.replace('Índice Bélico','').split('%')[0].replace(',','.').trim();
//Formula 0.1*(100 - IB actual)
var ibReducidoAlPaso = 0.1*(100-ib);
var ibAlPaso = (ib - ibReducidoAlPaso).toFixed(1);
if(ibAlPaso < 0)
	ibAlPaso = 0;

var idReducido = parseFloat(ib);
var count = 1;
while(15 <= idReducido){
	idReducido = idReducido - 0.1*(100-idReducido);
	if(15 <= idReducido)
		count++;
}
var pacifico= false;
/*if(ib<=15&&LOCAL.getValor()>500){
	var iconoP=`<span id="icono_pacifico"> <img src="//images.empire-strike.com/archivos/icon_paz.gif" width="15" height="15" align="absmiddle" hspace="2" title="Eres un imperio Pacífico"></span>`;
	$("#datos>tbody>tr:eq(4)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%${iconoP}</td>`);
	pacifico=true;
}
else{
	$("#datos>tbody>tr:eq(4)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%, necesitas ${count} paso(s) para volver a pacifico</td>`);
LOCAL.setPacifico(pacifico);
}*/


if(ib<=15&&LOCAL.getValor()>500){
	var iconoP=`<span id="icono_pacifico"> <img src="//images.empire-strike.com/archivos/icon_paz.gif" width="15" height="15" align="absmiddle" hspace="2" title="Eres un imperio Pacífico"></span>`;
	$("#datos > tbody > tr:nth-child(3)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%${iconoP}</td>`);
	pacifico=true;
}
else{
	$("#datos > tbody > tr:nth-child(3)").append(`<td><b>IB al paso:</b> ${ibAlPaso}%, necesitas ${count} paso(s) para volver a pacifico</td>`);
LOCAL.setPacifico(pacifico);
}
// OBTENER CIUDADES
var famaProduccion = 0;
$(".lista2:not(:first) tr").each(function(index, obj){
	if(index == 0)
		return;
	if(obj.children.length < 16 ||  obj.children.length > 17)
		return;
	var sinRutas = obj.children.length == 16 ? 1 : 0;
	var idCiudad = $(obj.children[0]).text().trim();
	var nombre = $(obj.children[2]).text().trim();
	var region = $(obj.children[3]).text().trim().replace("#","");
	var poblacion = $(obj.children[4]).text().trim().replace(/\./g,"");
	var oro = $(obj.children[7]).text().trim().replace(/\./g,"");
	var recursos = $(obj.children[8]).text().trim().replace(/\./g,"");
	var edificios = $(obj.children[9]).text().trim();
	var fama = parseInt($(obj.children[5]).text().trim().substring(0, 3));
	var moral = $(obj.children[14 - sinRutas]).text().trim().replace("%","");
	var defensa = obj.children[1].children[0].children[1].src.replace("https://images.empire-strike.com/archivos/sistemas_defensivos/25/","").replace(".jpg","");
	var proteccion = $(obj.children[15 - sinRutas]).text().trim();
	var tropas = $(obj.children[12 - sinRutas]).text().trim().replace(/\./g,"");
	famaProduccion =famaProduccion + parseInt(obj.children[5].innerText.split("+")[1].trim());
	
	if(proteccion == "SP" || proteccion == "CU")
	{
		ciudades.push(imperio_generateCiudad(id, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion));
		return;
	}
	var hh = parseInt(proteccion.substring(0,2));
	var mm = parseInt(proteccion.substring(3,5));

	var saleProteccion = new Date();
	saleProteccion = saleProteccion.addHours(hh);
	saleProteccion = saleProteccion.addMinutes(mm);

	ciudades.push(imperio_generateCiudad(id, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion));
	$(obj.children[15 - sinRutas]).append("<br><span style='font-size:11px'><b style='color:#990000'>" + saleProteccion.formatDate() + "</b></span>");
});


produccion.fama = famaProduccion;

// OBTENER HEROES
$(".lista2:first tr").each(function(index, obj){

	if(index == 0)
		return;

	if(obj.children.length != 20)
		return;

	var nombre = $(obj.children[1]).find("strong").html().trim();
	var clase = $(obj.children[2]).text().trim();
	var nivel = parseInt($(obj.children[1]).text().replace(nombre, "").replace("N", "").trim());
	var ataque = $(obj.children[5]).text().trim();
	var defensa = $(obj.children[6]).text().trim();
	var daño = $(obj.children[7]).text().trim();
	var vida = $(obj.children[8]).text().trim();
	var velocidad = $(obj.children[9]).text().trim();
	var moral = $(obj.children[10]).text().trim();
	var energia = $(obj.children[11]).text().trim();
	var habilidad = $(obj.children[13]).text().trim();
	var victorias  = $(obj.children[15]).text().trim();
	var region = $(obj.children[4]).text().trim().replace("#", "");
	var tropas = $(obj.children[14]).text().trim();

	heroes.push(imperio_generateHeroe(nombre, clase, nivel, ataque, defensa, daño, vida, velocidad, moral, energia, habilidad, victorias, region, tropas));

});

// OBTENER PRODUCCION
$("#cuadro_produccion .contenido table tr").each(function(index, obj){
	switch(index){
		case 0:
			produccion.turnos = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.hierro = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.herramientas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			produccion.armas = parseInt($(obj.children[8]).text().replace(/\./g,"").trim());
			break;
		case 1:
			produccion.mana = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.piedra = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.bloques = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 2:
			produccion.karma = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.madera = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.tablas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 3:
			produccion.oro = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.mithril = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.reliquias = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 4:
			produccion.alimentos = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.plata = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.joyas = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		case 5:
			produccion.agua = parseInt($(obj.children[1]).text().replace(/\./g,"").trim());
			produccion.gemas = parseInt($(obj.children[3]).text().replace(/\./g,"").trim());
			produccion.cristal = parseInt($(obj.children[6]).text().replace(/\./g,"").trim());
			break;
		default:
			return
	}
});

// CREAR BOTON TODAS LAS CIUDADES

// Crea un nuevo botón
const openAllButton = document.createElement("button");

// Añade la clase y el estilo
openAllButton.className = "boton-papiro";
openAllButton.style.height = "35px";

// Crea un nuevo elemento de imagen
const houseImg = document.createElement("img");
houseImg.src = "https://images.empire-strike.com/archivos/icon_ciudad2.gif";
houseImg.alt = "Casa";

// Crea un elemento de texto
const textNode = document.createTextNode("Abrir todas las ");

// Añade el texto y la imagen al botón
openAllButton.appendChild(textNode);
openAllButton.appendChild(houseImg);

// Añade un evento de clic al botón
openAllButton.onclick = function() {
  cityLinks.forEach((url) => {
    window.open(url, '_blank'); // Abre cada ciudad en una nueva pestaña
  });
};

// Encuentra la etiqueta <h3> donde quieres insertar el botón
const h3Tag = document.querySelector("#contenido > br.clearfix");

if (h3Tag) {
  // Alinea el botón a la derecha del elemento <h3>
openAllButton.style.margin = "auto";
openAllButton.style.display = "block";

  // Inserta el botón justo antes del elemento <h3>
  h3Tag.parentNode.insertBefore(openAllButton, h3Tag);
} else {
  console.log("No se encontró la etiqueta <h3>.");
}

// FIN CREAR BOTON TODAS LAS CIUDADES


if(LOCAL.getImperio() == null){
	var imperio = imperio_generateImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin(),pacifico);
	LOCAL.setCiudad(ciudades);
	LOCAL.setHeroe(heroes);
	LOCAL.setProduccion(produccion);
	LOCAL.setImperio(imperio)
	//API.setRutasHeroku(id,GLOBAL.getPartida(),clan,GLOBAL.getRonda(),ciudades)
	//API.setImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin());
}
	else
{
	var update = false;
	var localCiudades = LOCAL.getCiudad();
	var localHeroes = LOCAL.getHeroe();
	var localProduccion = LOCAL.getProduccion();

	if(localCiudades != null && localCiudades.length != ciudades.length)
		update = true;
	else if(localHeroes != null && localHeroes.length != heroes.length)
		update = true;
	else
	{
		if(localHeroes != null && !update)
			for(var i = 0; i < heroes.length; i++)
			{
				var temp = heroes[i];
				var heroe = null;

				for(var j = 0; j < localHeroes.length; j++)
					if(localHeroes[j].nombre == temp.nombre && localHeroes[j].clase == temp.clase)
						{
								heroe = localHeroes[j];
								break;
						}
				if(heroe != null &&
					(temp.nivel != heroe.nivel || temp.victorias != heroe.victorias
						|| temp.habilidad != heroe.habilidad || temp.ataque != heroe.ataque
					 || temp.defensa != heroe.defensa  || temp.daño != heroe.daño || temp.tropas != heroe.tropas
					 || temp.region != heroe.region))
				{
					update = true;
					break;
				}
			}
		if(localCiudades != null && !update)
			for(var i = 0; i < ciudades.length; i++)
			{
				var temp = ciudades[i];
				var ciudad = null;

				for(var j = 0; j < localCiudades.length; j++)
					if(localCiudades[j].idCiudad == temp.idCiudad)
						{
								ciudad = localCiudades[j];
								break;
						}

				if(ciudad != null &&
					(temp.poblacion != ciudad.poblacion || temp.fama != ciudad.fama
						|| temp.moral != ciudad.moral || temp.tropas != ciudad.tropas
					 || temp.edificios != ciudad.edificios  || temp.oro != ciudad.oro))
				{
					update = true;
					break;
				}
			}
	}
	if(update)
		API.setImperio(id, nombre, raza, GLOBAL.getPartida(), GLOBAL.getRonda(), clan, ciudades, produccion, heroes, GLOBAL.getFechaFin());
}
GLOBAL.cargaImperio();



function imperio_generateCiudad(idImperio, idCiudad, nombre, region, poblacion, edificios, oro, recursos, fama, moral, defensa, tropas, proteccion)
{
	return {
		"id": idImperio,
		"idCiudad": idCiudad,
		"nombre": nombre,
		"region": region,
		"poblacion": poblacion,
		"edificios": edificios,
		"oro": oro,
		"recursos": recursos,
		"fama": fama,
		"moral": moral,
		"defensa": defensa,
		"tropas": tropas,
		"proteccion": proteccion,
		"cargada": false,
		"data": null
	}
}

function imperio_generateHeroe(nombre, clase, nivel, ataque, defensa, daño, vida, velocidad, moral, energia, habilidad, victorias, region, tropas)
{
	return {
		"nombre" : nombre,
		"clase" : clase,
		"nivel" : nivel,
		"ataque" : ataque,
		"defensa" : defensa,
		"daño" : daño,
		"vida" : vida,
		"velocidad" : velocidad,
		"moral" : moral,
		"energia" : energia,
		"habilidad" : habilidad,
		"victorias" : victorias,
		"region" : region,
		"tropas" : tropas
	}
}

function imperio_generateImperio(id, name, raze, game, round, clan, ciudades, produccion, heroes, fechaFin,pacifico)
{
	return {
				"id": id,
				"nombre": name,
				"raza": raze,
				"partida": game,
				"ronda": round,
				"clan": clan,
				"ciudades": ciudades,
				"produccion": produccion,
				"heroes": heroes,
				"fechaFin": fechaFin,
				"pacifico": pacifico
	}
}
