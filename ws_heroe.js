// if(document.querySelector(".barra_porcentaje").innerText=="100%")
// 	document.getElementById("submit_realizar_quest").click();
// else{
// 	if (LOCAL.getHeroe()!=null){
// 	var Heroes = LOCAL.getHeroe()
// 	for (var i = 0; i < Heroes.length; i++){
// 		if(Heroes[i].link==location.href){
// 			Heroes[i].cargada=true;
// 			LOCAL.setHeroe(Heroes);
// 		}
// 	}
// 	//GLOBAL.cargaHeroe();
// }
// 	GLOBAL.cargaImperio();}

// document.getElementById("datosheroe"
// $(".lista1 tr").each(function(index, obj) {




var expactual = parseInt(document.getElementById("datosheroe").querySelector("tbody td p").innerHTML);
var expnextlvl = parseInt(document.getElementById("datosheroe").querySelector("div:nth-child(1) > table > tbody > tr > td:nth-child(3) > p:nth-child(1)").innerHTML);
var diferencia = expnextlvl - expactual;
console.log(expactual);
console.log(expnextlvl);
console.log(diferencia);
