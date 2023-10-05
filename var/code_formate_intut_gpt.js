var autoBuild = document.getElementById("autoBuild");
var ValorRecursos;
var dataCiudad = new Array();
var diaPartida = parseInt(document.getElementById("hora").innerText.split("DíA ")[1]);
var modoCierre = false;
if(diaPartida<19){
	ValorRecursos = MINIMOS;
	console.log("MINIMOS");
}
else if(diaPartida<48){
	ValorRecursos = MAXIMOS;
	console.log("MAXIMOS");
}
else{
	ValorRecursos = CIERRE;
	modoCierre    = true;
	console.log("modo CIERRE");
}
//tomo poblacion, quito espacios, punto de mil y parseo a entero
var pobla = parseInt(document.getElementById("poblacionciudad").innerText.trim().replace(".", ""));

//edifico con barra espaciadora
window.addEventListener("keydown", function (event) {
	if (event.key==' '){
		document.getElementById("frm_edificios").submit();
	}
});

//coloco boton de construccion al centro
document.getElementById('flotante').style.left="35%";

if (LOCAL.getPacifico())
k_Pacifico		   = 1.2;
rBase             *= k_Pacifico;
multiplicador.FAMA*= k_Pacifico;
multiplicador.ORO *= k_Pacifico;
multiplicador.ORO *= 1+parseInt(document.getElementById("impuestoactual").innerText.replace("%",""))/100;


var produccionCiudad = {};
var masRentable = 			99990;
var masRentableI = 			99990;
var flagRentable = 			false;
var rBase = 				30 * 2 * 1.44;
var k_Pacifico = 			1;
var multiplicador = {
    "ALIMENTOS": 			1,
    "AGUA": 				1,
    "HIERRO": 				1,
    "HERRAMIENTAS": 		1,
    "ARMAS": 				1,
    "PIEDRA": 				1,
    "MADERA": 				1,
    "BLOQUES": 				1,
    "TABLAS": 				1,
    "MITHRIL": 				1,
    "PLATA": 				1,
    "CRISTAL": 				1,
    "RELIQUIAS": 			1,
    "GEMAS": 				1,
    "JOYAS": 				1,
    "KARMA": 				1,
    "MANA": 				1,
    "ORO": 					1,
    "FAMA": 				1
}
multiplicador.ORO *= 1 + parseInt(document.getElementById("impuestoactual").innerText.replace("%", "")) / 100;

if (LOCAL.getPoliticas() != null) {
    let politicas = LOCAL.getPoliticas();
    multiplicador.KARMA 		= 1 + 0.05 * politicas.losdioses;
    multiplicador.MANA 			= 1 + 0.05 * politicas.magiaarcana;
    multiplicador.PIEDRA 		= 1 + 0.02 * (politicas.arquitectura + politicas.esclavitud);
    multiplicador.BLOQUES 		= 1 + 0.02 * politicas.arquitectura;
    multiplicador.MADERA 		= 1 + 0.01 * (politicas.esclavitud + 2 * politicas.naturaleza);
    multiplicador.AGUA 			= 1 + 0.01 * politicas.lamujer;
    multiplicador.TABLAS 		= 1 + 0.02 * politicas.naturaleza;
    multiplicador.ALIMENTOS 	= 1 + 0.01 * politicas.lamujer;
    multiplicador.PLATA 		= 1 + 0.02 * politicas.profundidadcuevas;
    multiplicador.HIERRO 		= (1 + 0.02 * politicas.profundidadcuevas) * (1 + 0.02 * politicas.esclavitud);
    multiplicador.MITHRIL 		= 1 + 0.01 * politicas.profundidadcuevas;
    multiplicador.ORO 			*= (1 + (0.02 * politicas.burguesia)) * (1 - (0.02 * politicas.aduanas)) * (1 - (0.02 * politicas.nobleza));
    rBase 						*= 1 + (0.06 * politicas.rutasdecontrabando);
}

if (LOCAL.getClan() != null) {
    bonoMaravilla(LOCAL.getClan(), 1)
    bonoMaravilla(LOCAL.getClan(), 2)