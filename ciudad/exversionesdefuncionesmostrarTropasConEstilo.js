

/// ver 4

// function tropasActuantes() {
//     let cantTropasActivas = 0;
//     let cantTropasInactivas = 0;

//     const tropas = document.querySelectorAll("span.porcentajetropas");

//     tropas.forEach((obj) => {
//         let porcentaje = parseFloat(obj.textContent.replace("%", ""));
//         if (porcentaje >= 5) cantTropasActivas++;
//         if (porcentaje >= 0 && porcentaje < 5) cantTropasInactivas++;
//     });

//     const tableDiv = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div");
//     const tableInfoRecursos = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div > table.inforecursos");

//     const newTable = document.createElement("table");
//     newTable.width = "100%";

//     const tbody = document.createElement("tbody");
//     const fila = document.createElement("tr");

//     fila.appendChild(crearCelda("Activas:", cantTropasActivas.toString(), "blue", "24px"));
//     fila.appendChild(crearCelda("Inactivas:", cantTropasInactivas.toString(), "red", "18px"));

//     tbody.appendChild(fila);
//     newTable.appendChild(tbody);
//     tableDiv.insertBefore(newTable, tableInfoRecursos);
// }

// function crearCelda(titulo, numero, color, fontSize) {
//     const celda = document.createElement("td");

//     celda.classList.add("celda-centrada");

//     const divTitulo = document.createElement("div");
//     divTitulo.textContent = titulo;
//     divTitulo.style.color = "black";
//     divTitulo.style.fontSize = "12px";
//     divTitulo.style.fontWeight = "700";

//     const divNumero = document.createElement("div");
//     divNumero.textContent = numero;
//     divNumero.style.color = color;
//     divNumero.style.fontSize = fontSize;
//     divNumero.style.fontWeight = "700";

//     celda.appendChild(divTitulo);
//     celda.appendChild(divNumero);

//     return celda;
// }

/// version3

// function tropasActuantes() {
//     let cantTropasActivas = 0;
//     let cantTropasInactivas = 0;

//     const tropas = document.querySelectorAll("span.porcentajetropas");

//     tropas.forEach((obj) => {
//         let porcentaje = parseFloat(obj.textContent.replace("%", ""));
//         if (porcentaje >= 5) cantTropasActivas++;
//         if (porcentaje >= 0 && porcentaje < 5) cantTropasInactivas++;
//     });

//     const tbody = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div > table:nth-child(1) > tbody");
//     const fila = document.createElement("tr");

//     fila.appendChild(crearCelda("Activas:", cantTropasActivas.toString(), "blue", "24px"));
//     fila.appendChild(crearCelda("Inactivas:", cantTropasInactivas.toString(), "red", "18px"));

//     tbody.appendChild(fila);
// }

// function crearCelda(titulo, numero, color, fontSize) {
//     const celda = document.createElement("td");

//     celda.classList.add("celda-centrada"); // Añadir una clase específica
//     const divTitulo = document.createElement("div");
//     divTitulo.textContent = titulo;
//     divTitulo.style.color = "black";
//     divTitulo.style.fontSize = "12px";
//     divTitulo.style.fontWeight = "700";

//     const divNumero = document.createElement("div");
//     divNumero.textContent = numero;
//     divNumero.style.color = color;
//     divNumero.style.fontSize = fontSize;
//     divNumero.style.fontWeight = "700";

//     celda.appendChild(divTitulo);
//     celda.appendChild(divNumero);

//     return celda;
// }

/// ver 2
// function tropasActuantes() {
//     let cantTropasActivas = 0;
//     let cantTropasInactivas = 0;

//     const tropas = document.querySelectorAll("span.porcentajetropas");

//     tropas.forEach((obj) => {
//         let porcentaje = parseFloat(obj.textContent.replace("%", ""));
//         if (porcentaje >= 5) cantTropasActivas++;
//         if (porcentaje >= 0 && porcentaje < 5) cantTropasInactivas++;
//     });

//     const tbody = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div > table:nth-child(1) > tbody");
//     const fila = document.createElement("tr");

//     fila.appendChild(crearCelda("Activas:", cantTropasActivas.toString(), "blue", "24px"));
//     fila.appendChild(crearCelda("Inactivas:", cantTropasInactivas.toString(), "red", "18px"));

//     tbody.appendChild(fila);
// }

// function crearCelda(titulo, numero, color, fontSize) {
//     const celda = document.createElement("td");

//     const divTitulo = document.createElement("div");
//     divTitulo.textContent = titulo;
//     divTitulo.style.color = "black";
//     divTitulo.style.fontSize = "12px";
//     divTitulo.style.fontWeight = "700";

//     const divNumero = document.createElement("div");
//     divNumero.textContent = numero;
//     divNumero.style.color = color;
//     divNumero.style.fontSize = fontSize;
//     divNumero.style.fontWeight = "700";

//     celda.appendChild(divTitulo);
//     celda.appendChild(divNumero);

//     return celda;
// }

// function tropasActuantes() {
//     // CANTIDAD DE TROPAS QUE ACTUAN EN LA DEFENSA DE LA CIUDAD
//     var cantTropasActivas = 0; // Esta variable llevará la cantTropasActivas de los porcentajes mayores o iguales a 5
//     var cantTropasInactivas = 0; // Esta variable llevará la cantTropasActivas de los porcentajes mayores o iguales a 5
//     const tropas = document.querySelectorAll("span.porcentajetropas");
//     tropas.forEach(function callback(obj, index) {
//         // Elimina el símbolo '%' y convierte el texto en un número
//         var porcentaje = parseFloat(obj.textContent.replace("%", ""));
//         // Compara si el porcentaje es mayor o igual a 5
//         if (porcentaje >= 5) {
//             cantTropasActivas++;
//         }
//         if (porcentaje >= 0 && porcentaje < 5){
//             cantTropasInactivas++;
//         }
//     });
//     // Ahora, añade la nueva fila a la tabla
//     const tbody = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div > table:nth-child(1) > tbody");
//     // tropas inactivas
//     const nuevaFila2 = document.createElement("tr");
//     const celdaImagen2 = document.createElement("td");
//     celdaImagen2.width = "44";
//     nuevaFila2.appendChild(celdaImagen2);
//     const celdaMensaje2 = document.createElement("td");
//     celdaMensaje2.colSpan = 2; // Hace que la celda ocupe dos columnas
//     const textoMensaje2 = document.createElement("span");
//     textoMensaje2.textContent = "Tropas que no actúan: ";
//     textoMensaje2.style.fontSize = "12px";
//     textoMensaje2.style.fontWeight = "700";
//     const numTropasInacticas = document.createElement("span");
//     numTropasInacticas.textContent = `${cantTropasInactivas}`;
//     numTropasInacticas.style.fontSize = "18px";
//     numTropasInacticas.style.fontWeight = "500";
//     numTropasInacticas.style.color = "red";
//     celdaMensaje2.appendChild(textoMensaje2);
//     celdaMensaje2.appendChild(numTropasInacticas);
//     nuevaFila2.appendChild(celdaMensaje2);
//     tbody.appendChild(nuevaFila2);
//     /// tropas acticas
//     const nuevaFila = document.createElement("tr");
//     const celdaImagen = document.createElement("td");
//     celdaImagen.width = "44";
//     nuevaFila.appendChild(celdaImagen);
//     // Añade las celdas a la nueva fila
//     const celdaMensaje = document.createElement("td");
//     celdaMensaje.colSpan = 2; // Hace que la celda ocupe dos columnas
//     const textoMensaje = document.createElement("span");
//     textoMensaje.textContent = "Tropas que actúan: ";
//     textoMensaje.style.fontSize = "12px";
//     textoMensaje.style.fontWeight = "700";
//    /* const textSeparador = document.createElement("span");
//     textSeparador.textContent = " - ";
//     textSeparador.style.fontSize = "12px";
//     textSeparador.style.fontWeight = "700";*/
//     const numTropasActivas = document.createElement("span");
//     numTropasActivas.textContent = `${cantTropasActivas}`;
//     numTropasActivas.style.fontSize = "24px";
//     numTropasActivas.style.fontWeight = "700";
//     numTropasActivas.style.color = "blue";
//     celdaMensaje.appendChild(textoMensaje);
//     celdaMensaje.appendChild(numTropasActivas);
//     nuevaFila.appendChild(celdaMensaje);
//     tbody.appendChild(nuevaFila);
//     // celdaMensaje.appendChild(numTropasInacticas);
//     // celdaMensaje.appendChild(textSeparador);
// }
