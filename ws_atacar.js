/*var rondas = [1,2,3,4,5,6,7,8,9,10];


function data(){
	$("#rra > h3:nth-child(8)").each(function(index, obj) {
			rondas[index] = obj.innerText;;
			console.log(rondas[index]);});

	$(".combate_cronica").each(function(index, obj) {
			var cronica = obj.innerText;
			// console.log("Combate crónica: "+index);
			console.log(cronica);});
	$(".combate_ata span").each(function(index, obj) {
			// console.log("Combate ataque: "+index);
			var trop_ata = obj.innerText;
			console.log(trop_ata);});
	$(".combate_def span").each(function(index, obj) {
			// console.log("Combate defensa: "+index);
			var trop_def = obj.innerText;
			console.log(trop_def);});

}
data();*/
function atacar()
{
	// var autoAtack = LOCAL.getautoA();
	if(LOCAL.getImperio() == null)
		return;

	var ataque = {
		"guid": LOCAL.getImperio().guidImperio,
		"partida": GLOBAL.getPartida(),
		"ronda": GLOBAL.getRonda(),
		"nombreCiudad": $("#ataque-def #nombreheroed").html().trim(),
		"perdidasAtaque": parseInt($("#ataque-ata #perdidasheroe").html().trim().replace(".","").replace(",","")),
		"perdidasDefensa": parseInt($("#ataque-def #perdidasheroed").html().trim().replace(".","").replace(",","")),
		"atacante": new Array(),
		"defensor": new Array(),
		"bonus": new Array(),
		"round": new Array()
	};

	var asedio = LOCAL.getAsedioByName(ataque.nombreCiudad);
	if(asedio != null && asedio.marcado)
	{
			asedio.marcado = false;
			LOCAL.setAsedio(asedio);
	}

	$(".lista1 tr:has(td.atacante)").each(function(index, obj){
			var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N",""));
			var nombre = $(obj.children[1]).find("span").text();
			var inicio = parseInt($(obj.children[2]).html().trim());
			var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%",""));
			var fin = parseInt($(obj.children[4]).html().trim());

			ataque.atacante.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
	});

	$(".lista1 tr:has(td.defensor)").each(function(index, obj){
		var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N",""));
		var nombre = $(obj.children[1]).find("span").text();
		var inicio = parseInt($(obj.children[2]).html().trim());
		var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%",""));
		var fin = parseInt($(obj.children[4]).html().trim());

		ataque.defensor.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
	});

	$("#rra .bonus_ataque").each(function(index,obj){
		var bonus= obj.className + $(obj).text();
		ataque.bonus.push(bonus);
	});
	
	$("#rra .round").each(function(index,obj){
		ataque.round.push($(obj).text());
	});
	var ataques = new Array();
	if(LOCAL.getAtaques()!=null)
		ataques=LOCAL.getAtaques();
	ataques.push(ataque)
	LOCAL.setAtaque(ataques);
	//API.setAtaque(ataque);
	setTimeout(() => {
		document.getElementById("ataque-rounds").prepend(document.querySelectorAll("table")[2]);
	},200);

	// Auto ataque
	
	if (autoAtack) {
		location.replace("movertropas.php");
	}

}

function atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin)
{
	return {
		"nombre": nombre,
		"nivel": nivel,
		"inicio": inicio,
		"porcentaje": porcentaje,
		"fin": fin
	};
}
