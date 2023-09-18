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




let expactual = parseInt(document.getElementById("datosheroe").querySelector("tbody td p").innerHTML);
let expnextlvl = parseInt(document.getElementById("datosheroe").querySelector("div:nth-child(1) > table > tbody > tr > td:nth-child(3) > p:nth-child(1)").innerHTML);
let diferencia = expnextlvl - expactual;
console.log(expactual);
console.log(expnextlvl);
console.log(diferencia);

let qfacil = diferencia/150;

console.log(qfacil);

$("#datosheroe").append(`<td float="center"><b>Quest para subir nivel: </b><div style="font-size: x-large"> F: ${parseInt(qfacil)}</div></td>`);


//$("#datosheroe").append(`<td><div align="right" style="font-size: x-large"> <b>Quest subir nivel: </b></div></td>`);
//$("#datosheroe").append(`<td>Quest para subir:</td>`);
//$("#datosheroe").append(`<td><b>F: </b><div> ${qfacil}</div></td>`);


