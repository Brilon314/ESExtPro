function conflictos() {
    function procesarTabla(table) {
        if (table) {
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

                    const wonSpan = document.createElement("span");
                    wonSpan.innerHTML = `(${wonPercentage}%)`;
                    wonSpan.style.textAlign = "left";
                    if (won > 99) {
                        wonSpan.style.marginLeft = "30px";
                    }
                    if (won > 10 && won < 100) {
                        wonSpan.style.marginLeft = "35px";
                    }
                    if (won > -1 && won < 10) {
                        wonSpan.style.marginLeft = "40px";
                    }
                    cells[1].appendChild(wonSpan);

                    const lostSpan = document.createElement("span");
                    lostSpan.innerHTML = `&emsp;&emsp;(${lostPercentage}%)`;
                    lostSpan.style.textAlign = "center";
                    cells[2].appendChild(lostSpan);
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
        let encabezado = tabla
            .querySelector("tr.titulos > td")
            .innerText.trim();
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
