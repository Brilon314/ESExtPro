function conflictos() {
  function procesarTabla(table) {
    if (table) {
      // Aumentar el tamaño de la fuente de toda la tabla
      table.style.fontSize = "1.2em"; // Ajusta este valor según tus preferencias
      // Captura todas las filas de la tabla
      const rows = table.querySelectorAll("tr.impar, tr.par");
      // Recorre cada fila
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        // Chequeo de que posean la info esperada
        if (cells.length > 3) {
          const won = parseInt(cells[1].textContent.trim(), 10); // Ataques ganados
          const lost = parseInt(cells[2].textContent.trim(), 10); // Ataques perdidos
          const total = won + lost;
          const wonPercentage = ((won / total) * 100).toFixed(1);
          const lostPercentage = ((lost / total) * 100).toFixed(1);
          const wonCell = document.createElement("td");
          wonCell.textContent = `${wonPercentage}%`;
          wonCell.style.textAlign = "center";
          wonCell.style.color = "#006600"; // Color verde para porcentajes ganados
          // wonCell.style.color   = "#006600"; // Color verde para porcentajes ganados
          wonCell.style.fontWeight = "bold"; // Hacer el texto en negrita
          cells[1].after(wonCell); // Insertar después de la celda de ataques ganados
          const lostCell = document.createElement("td");
          lostCell.textContent = `${lostPercentage}%`;
          lostCell.style.textAlign = "center";
          lostCell.style.color = "#990000"; // Color rojo para porcentajes perdidos
          lostCell.style.fontWeight = "bold"; // Hacer el texto en negrita
          cells[2].after(lostCell); // Insertar después de la celda de ataques perdidos
        }
      });
    } else {
      console.log("No se encontró la tabla.");
    }
  }
  let tablas = document.querySelectorAll("table.lista1");
  let tablaAtacante, tablaDefensor;
  // Diferenciamos las tablas por su contenido
  for (let tabla of tablas) {
    let encabezado = tabla.querySelector("tr.titulos > td").innerText.trim();
    // Insertamos los nuevos encabezados
    if (encabezado === "Clan atacante" || encabezado === "Clan defensor") {
      let headers = tabla.querySelectorAll("tr.titulos > td");
      let wonPercentageHeader = document.createElement("td");
      wonPercentageHeader.textContent = "%";
      wonPercentageHeader.style.textAlign = "center";
      headers[1].after(wonPercentageHeader); // Insertar después del título "Ganados"
      let lostPercentageHeader = document.createElement("td");
      lostPercentageHeader.textContent = "%";
      lostPercentageHeader.style.textAlign = "center";
      headers[2].after(lostPercentageHeader); // Insertar después del título "Perdidos"
    }
    // Identificamos las tablas
    if (encabezado === "Clan atacante") {
      tablaAtacante = tabla;
    } else if (encabezado === "Clan defensor") {
      tablaDefensor = tabla;
    }
  }
  // Procesar las tablas
  procesarTabla(tablaAtacante);
  procesarTabla(tablaDefensor);
}
// function conflictos() {
//     function procesarTabla(table) {
//         if (table) {
//             // Captura todas las filas de la tabla
//             const rows = table.querySelectorAll("tr.impar, tr.par");
//             // Recorre cada fila
//             rows.forEach((row) => {
//                 const cells = row.querySelectorAll("td");
//                 // Chequeo de que posean la info esperada
//                 if (cells.length > 3) {
//                     const won = parseInt(cells[1].textContent.trim(), 10); // Ataques ganados
//                     const lost = parseInt(cells[2].textContent.trim(), 10); // Ataques perdidos
//                     const total = won + lost;
//                     const wonPercentage = ((won / total) * 100).toFixed(1);
//                     const lostPercentage = ((lost / total) * 100).toFixed(1);
//                     const wonSpan = document.createElement("span");
//                     wonSpan.innerHTML = `(${wonPercentage}%)`;
//                     wonSpan.style.textAlign = "center";
//                     wonSpan.style.marginRight = "20px";
//                     wonSpan.style.marginLeft = "20px";
//                     // if (won > 99) {
//                     //     wonSpan.style.marginLeft = "30px";
//                     // }
//                     // if (won > 10 && won < 100) {
//                     //     wonSpan.style.marginLeft = "35px";
//                     // }
//                     // if (won > -1 && won < 10) {
//                     //     wonSpan.style.marginLeft = "40px";
//                     // }
//                     cells[1].append(wonSpan);
//                     const lostSpan = document.createElement("span");
//                     lostSpan.innerHTML = `(${lostPercentage}%)`;
//                     lostSpan.style.textAlign = "center";
//                     lostSpan.style.marginRight = "20px";
//                     lostSpan.style.marginLeft = "20px";
//                     cells[2].append(lostSpan);
//                 }
//             });
//         } else {
//             console.log("No se encontró la tabla.");
//         }
//     }
//     let tablas = document.querySelectorAll("table.lista1");
//     let tablaAtacante, tablaDefensor;
//     // Diferenciamos las tablas por su contenido
//     for (let tabla of tablas) {
//         let encabezado = tabla
//             .querySelector("tr.titulos > td")
//             .innerText.trim();
//         if (encabezado === "Clan atacante") {
//             tablaAtacante = tabla;
//         } else if (encabezado === "Clan defensor") {
//             tablaDefensor = tabla;
//         }
//     }
//     // Procesar las tablas
//     procesarTabla(tablaAtacante);
//     procesarTabla(tablaDefensor);
// }