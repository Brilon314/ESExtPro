function conflictos() {
    // Encuentra la tabla que contiene la información.
    const table = document.querySelector("#contenido > table > tbody > tr:nth-child(3) > td > div > table:nth-child(13)");
    ////console.log("table", table);
    if (table) {
        // Obtiene todas las filas de la tabla
        const rows = table.querySelectorAll("tr.impar, tr.par");
        ////console.log('rows:', rows);
        // Recorre cada fila
        rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            //console.log('cells:', cells);
            // Asegurarse de que tiene las celdas adecuadas
            if (cells.length > 3) {
                const won = parseInt(cells[1].textContent.trim(), 10); // Ataques ganados
                //console.log('won:', won);
                const lost = parseInt(cells[2].textContent.trim(), 10); // Ataques perdidos
                //console.log('lost:', lost);
                const total = won + lost;
                //console.log('total:', total);
                const wonPercentage = ((won / total) * 100).toFixed(1);
                //console.log('wonPercentage:', wonPercentage);
                const lostPercentage = ((lost / total) * 100).toFixed(1);
                //console.log('lostPercentage:', lostPercentage);
                // cells[1].textContent += ` (${wonPercentage}%)`;
                // cells[2].textContent += ` (${lostPercentage}%)`;
                const wonSpan = document.createElement('span');
                //wonSpan.innerHTML = `&emsp;&emsp;(${wonPercentage}%)`; // Usamos innerHTML
                wonSpan.innerHTML = `(${wonPercentage}%)`; // Usamos innerHTML
                wonSpan.style.textAlign = 'left';
                if (won > 99) {
                    wonSpan.style.marginLeft = '30px';
                }
                if (won > 10 && won < 100) {
                    wonSpan.style.marginLeft = '45px';
                }
                if (won > -1 && won < 10) {
                    wonSpan.style.marginLeft = '40px';
                }
                cells[1].appendChild(wonSpan);
                const lostSpan = document.createElement('span');
                lostSpan.innerHTML = `&emsp;&emsp;(${lostPercentage}%)`; // Usamos innerHTML
                lostSpan.style.textAlign = 'center';
                cells[2].appendChild(lostSpan);
            }
        });
    } else {
        console.log("No se encontró la tabla.");
    }
    // Encuentra la tabla que contiene la información.
    const table2 = document.querySelector("#contenido > table > tbody > tr:nth-child(3) > td > div > table:nth-child(16)");
    ////console.log("table", table);
    if (table2) {
        // Obtiene todas las filas de la tabla
        const rows2 = table2.querySelectorAll("tr.impar, tr.par");
        ////console.log('rows:', rows);
        // Recorre cada fila
        rows2.forEach((row) => {
            const cells2 = row.querySelectorAll("td");
            //console.log('cells:', cells);
            // Asegurarse de que tiene las celdas adecuadas
            if (cells2.length > 3) {
                const won = parseInt(cells2[1].textContent.trim(), 10); // Ataques ganados
                //console.log('won:', won);
                const lost = parseInt(cells2[2].textContent.trim(), 10); // Ataques perdidos
                //console.log('lost:', lost);
                const total = won + lost;
                //console.log('total:', total);
                const wonPercentage = ((won / total) * 100).toFixed(1);
                //console.log('wonPercentage:', wonPercentage);
                const lostPercentage = ((lost / total) * 100).toFixed(1);
                const wonSpan = document.createElement('span');
                wonSpan.style.marginLeft = '20px'; // Cambiamos marginRight por marginLeft
                wonSpan.textContent = `(${wonPercentage}%)`;
                if (won > 99) {
                    wonSpan.style.marginLeft = '30px';
                }
                if (won >= 10 && won < 100) {
                    wonSpan.style.marginLeft = '40px';
                }
                if (won > -1 && won < 10) {
                    wonSpan.style.marginLeft = '45px';
                }
                cells2[1].appendChild(wonSpan);
                const lostSpan = document.createElement('span');
                lostSpan.style.marginLeft = '20px'; // Cambiamos marginRight por marginLeft
                lostSpan.textContent = `(${lostPercentage}%)`;
                cells2[2].appendChild(lostSpan);
            }
        });
    } else {
        console.log("No se encontró la tabla.");
    }
}