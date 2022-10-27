var politicas ={
losdioses         : 0,
magiaarcana       : 0,
rituales          : 0,
cultodemoniaco    : 0,
arquitectura      : 0,
rutasdecontrabando: 0,
profundidadcuevas : 0,
esclavitud        : 0,
patriotismo       : 0,
serviciomilitar   : 0,
torturas          : 0,
aduanas           : 0,
naturaleza        : 0,
libertadpolitica  : 0,
burguesia         : 0,
gremios           : 0,
lamujer           : 0,
nobleza           : 0,
justicia          : 0,
medicina          : 0,
escuelas          : 0,
musica            : 0
}
  
document.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
	if(index == 0)
        return;

    if(obj.children.length < 3)
	   return;  

    var nombre = obj.children[1].innerText.trim();
    var contador= 0;
    for (var i = 0; i < 10; i++) {
        if(obj.children[4].children[i].src=="https://images.empire-strike.com/v2/interfaz/estrella-roja.png")
            contador=contador+1;
        else
            break;
    }
    nombre=nombre.split("Coste: ");
    nombre= borrarAcentos(nombre[0].toLowerCase().replace(" ","").replace(" ",""));
    politicas[nombre]=contador;
});
LOCAL.setPoliticas(politicas);
GLOBAL.cargaImperio();

function borrarAcentos(str){
   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Testing

// document.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
//     if (index == 0) {
//         return;
//     }
//     creaBoton(obj.children[1],"Subir",);
// // Creando una lista de valores

//     var arr = [
//       {val : 1, text: '1'},
//       {val : 2, text: '2'},
//       {val : 3, text: '3'},
//       {val : 4, text: '4'},
//       {val : 5, text: '5'},
//       {val : 6, text: '6'},
//       {val : 7, text: '7'},
//       {val : 8, text: '8'},
//       {val : 9, text: '9'},
//       {val : 10, text: '10'}
//     ];

//     var sel = $('<select>').appendTo(obj.children[2]);
//     $(arr).each(function() {
//      sel.append($("<option style='display: inline'>").attr('value',this.val).text(this.text));
//     });
     

// });

// Fin testing

//     let container = document.getElementById("hdioses");
//     let newDiv = document.createElement("div");
//     newDiv.setAttribute("id", "new-div");
      
//     newDiv.innerHTML = `<div>this content to append</div>`
//     container.prepend(newDiv);


// #new-div {
//   float: right;
// }
    // if(index == 0)
    //     return;

    // if(obj.children.length < 3)
    //    return;  

    // var nombre = obj.children[1].innerText.trim();
    // var contador= 0;
    // for (var i = 0; i < 10; i++) {
    //     if(obj.children[4].children[i].src=="https://images.empire-strike.com/v2/interfaz/estrella-roja.png")
    //         contador=contador+1;
    //     else
    //         break;
    // }
    // nombre=nombre.split("Coste: ");
    // nombre= borrarAcentos(nombre[0].toLowerCase().replace(" ","").replace(" ",""));
    // politicas[nombre]=contador;
// });

function creaBoton(obj,nombre,accion){
        //crear boton
        const button = document.createElement('button');
        button.setAttribute("id", nombre);
        button.type = 'button'; 
        button.innerText = nombre;
        button.onclick = accion;
        button.className= "boton-papiro";
        obj.appendChild(button);
        return button;
        //boton creado
}
