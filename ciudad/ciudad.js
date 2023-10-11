construirConTecla(" ");
setStyle();
setEdificador();
//lista elementos de edificio: 0-32 = seleciona edificio || 0 = nombre, 1 = borrar, 2-11 = estrellas
var listaElementosEdificios = document.querySelectorAll(".c .nome");
var edificios = [];
var estrella = new estrellas();
var ciudad = null;
var recursos = null;
var tablaEficiencia = [];
var autoBuild = document.getElementById("autoBuild");
var limpiarConstruido = document.getElementById("clean");
limpiarConstruido.onclick = function () {
    document.querySelectorAll(".elim").forEach(function callback(obj, index) {
        obj.click();
    });
    mostrarCasitas();
};
autoBuild.onkeyup = function () {
    estrellaAzul();
};
UTIL.injectCode("base/setvalueedif.js");
setTimeout(() => {
    var recursosActuales = JSON.parse(document.getElementById("recursosActuales").value);
    //cargo datos de ciudad
    recursos = new recursosClass(recursosActuales);
    var multiplicador = new multiplicadores(GLOBAL.getPartida(), GLOBAL.gobiernoRegion(), LOCAL.getImperio(), getDataCiudad(document), LOCAL.getPoliticas(), LOCAL.getClan());
    listaElementosEdificios.forEach(function callback(obj, index) {
        var nombre = obj.innerText
            .trim()
            .replace(" ", "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        var construido = parseInt(document.getElementById("txt_edificio_ya_compradas_" + index).value) + 1;
        edificios.push(new edificioclass(nombre, construido, COSTOS_INICIALES, PRODUCCION_BASE, multiplicador.getMultiplicador()));
        setElementoEdificio(index);
    });
    tablaEficiencia.sort(comparar);
    ciudad = new ciudadclass(getDataCiudad(document), edificios, getEstado(document), GLOBAL.gobiernoRegion());
    calculaEstrellas();
    cargaCiudad();
}, 200);

function calculaEstrellas() {
    for (var i = 0; i < edificios.length; i++) {
        estrellaVerde(i);
    }
}
function estrellaVerde(idEdificio) {
    var elementos = listaElementosEdificios[idEdificio].children;
    for (var i = 2; i < elementos.length; i++) {
        if (elementos[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png" || elementos[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-amarilla.png") {
            continue;
        }
        if (estrella.puedoconstruir(idEdificio, edificios, i - 1, recursos.getRecursos())) elementos[i].src = chrome.runtime.getURL("base/estrella-verde.png");
        else elementos[i].src = "https://images.empire-strike.com/v2/interfaz/estrella-vacia.png";
    }
}
function setElementoEdificio(idEdificio) {
    var elementoEdificio = listaElementosEdificios[idEdificio];
    elementoEdificio.addEventListener("mouseout", function () {
        estrellaVerde(idEdificio);
        if (idEdificio > 0) estrellaVerde(idEdificio - 1);
        estrellaAzul();
    });
    setClicks(elementoEdificio.children[1], idEdificio);
    elementoEdificio.querySelectorAll(".estrella").forEach(function callback(obj) {
        var estrella = parseInt(obj.dataset.attr.split(",")[1]) + 1;
        tablaEficiencia.push([idEdificio, estrella, edificios[idEdificio].getRentabilizacion(MINIMOS, estrella, 2)]);
        if (EDIFICIOS_REQUERIDOS[idEdificio] && EDIFICIOS_REQUERIDOS[idEdificio] < estrella) tablaEficiencia.push([EDIFICIOS_REQUERIDOS[idEdificio], estrella, edificios[idEdificio].getRentabilizacion(MINIMOS, estrella, 2)]);
        setClicks(obj, idEdificio);
        obj.addEventListener("mouseover", function () {
            estrellaVerde(idEdificio);
            estrellaAzul();
        });
    });
}
function cargaCiudad() {
    if (LOCAL.getCiudad() == null) return;
    var ciudades = LOCAL.getCiudad();
    var idCiudad = parseInt(document.querySelector(".tituloimperio").innerText.split("#")[1]);
    for (var i = 0; i < ciudades.length; i++) {
        if (ciudades[i].idCiudad != idCiudad) continue;
        ciudades[i].cargada = true;
        ciudades[i].data = ciudad.getData();
        LOCAL.setCiudad(ciudades);
    }
}
function setClicks(elemento, idEdificio) {
    elemento.addEventListener("click", function () {
        var seleccionados = parseInt(document.getElementById("xx_txt_costo_edificio_estrella_seleccionada_" + idEdificio).value) + 1;
        edificios[idEdificio].setSeleccionado(seleccionados);
        recursos.setVariacionRecursos(getRecursosUsados(document));
        calculaEstrellas();
        estrellaAzul();
        mostrarCasitas(getEdificiosSeleccionados());
    });
}

function estrellaAzul() {
    for (i = 0; i < tablaEficiencia.length; i++) {
        var idEdificio = tablaEficiencia[i][0];
        var edificio = edificios[idEdificio];
        var numeroEstrella = tablaEficiencia[i][1];
        var obj = listaElementosEdificios[idEdificio].children[numeroEstrella + 1];

        if (edificio.getConstruido() >= numeroEstrella) continue;
        if (!estrella.puedoconstruir(idEdificio, edificios, numeroEstrella, recursos.getRecursos())) continue;
        if (autoBuild.value > getEdificiosSeleccionados()) {
            obj.click();
            break;
        } else {
            obj.src = chrome.runtime.getURL("base/estrella-azul.png");
            break;
        }
    }
}
function tropasActuantes() {
    // CANTIDAD DE TROPAS QUE ACTUAN EN LA DEFENSA DE LA CIUDAD
    var cantTropasActivas = 0; // Esta variable llevará la cantTropasActivas de los porcentajes mayores o iguales a 5
    const tropas = document.querySelectorAll("span.porcentajetropas");
    tropas.forEach(function callback(obj, index) {
        // Elimina el símbolo '%' y convierte el texto en un número
        var porcentaje = parseFloat(obj.textContent.replace("%", ""));
        // Compara si el porcentaje es mayor o igual a 5
        if (porcentaje >= 5) {
            cantTropasActivas++;
        }
    });
    // Ahora, añade la nueva fila a la tabla
    const tbody = document.querySelector("#acciones_ciudad_wrapper > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > div > table:nth-child(1) > tbody");
    const nuevaFila = document.createElement("tr");
    // Añade las celdas a la nueva fila
    const celdaImagen = document.createElement("td");
    celdaImagen.width = "44";
    nuevaFila.appendChild(celdaImagen);
    const celdaMensaje = document.createElement("td");
    celdaMensaje.colSpan = 2; // Hace que la celda ocupe dos columnas
    const textoMensaje = document.createElement("span");
    textoMensaje.textContent = "Tropas que actúan: ";
    textoMensaje.style.fontSize = "12px";
    textoMensaje.style.fontWeight = "700";
    const numeroMensaje = document.createElement("span");
    numeroMensaje.textContent = `${cantTropasActivas}`;
    numeroMensaje.style.fontSize = "24px";
    numeroMensaje.style.fontWeight = "700";
    numeroMensaje.style.color = "red";
    celdaMensaje.appendChild(textoMensaje);
    celdaMensaje.appendChild(numeroMensaje);
    nuevaFila.appendChild(celdaMensaje);
    tbody.appendChild(nuevaFila);
}

function moverBotones() {
    // Selecciona el elemento <div> a mover
    const divElement = document.querySelector('div[style="clear:both;margin:5px 0 20px 0"]');
    // Selecciona el elemento que después se inserta el <div>
    const targetElement = document.querySelector("#contenido > h3");
    // Mueve el elemento <div> arriba
    if (divElement && targetElement) {
        targetElement.insertAdjacentElement("afterend", divElement);
    }
    // Crear un nuevo <div> con un <span> dentro
    const nuevoDiv = document.createElement("div");
    nuevoDiv.style.height = "25px";
    const contenidoSpan = document.createElement("span");
    contenidoSpan.textContent = "                 ";
    contenidoSpan.style.fontSize = "12px";
    contenidoSpan.style.fontWeight = "350";
    nuevoDiv.appendChild(contenidoSpan);
    const elementoObjetivo = document.querySelector('div[style="clear:both;margin:5px 0 20px 0"]');
    // Añadir el nuevo <div> después del elemento
    if (elementoObjetivo) {
        elementoObjetivo.insertAdjacentElement("afterend", nuevoDiv);
    }
    // Selecciona el elemento <div> que contiene los enlaces
    const elementoDivEstilo = document.querySelector('div[style="clear:both;margin:5px 0 20px 0"]');
    // Si el elemento <div> existe
    if (elementoDivEstilo) {
        // Selecciona todos los enlaces <a> dentro del <div>
        const enlaces = elementoDivEstilo.querySelectorAll("a.boton_bloque");
        // Aplica los estilos deseados a cada enlace
        enlaces.forEach((enlace) => {
            enlace.style.fontWeight = "bold"; // Hace el texto en negrita
        });
    }
}
tropasActuantes();
moverBotones();
