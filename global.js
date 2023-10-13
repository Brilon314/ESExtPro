var _NONE = 0;
var _ASEDIO = 1;
var _REGIONES = 2;
var _RECONQUISTA = 3;
var _INFORME = 1;
var _INFORMECOMPARTIDO = 2;
var politics = {
	losdioses: 0,
	magiaarcana: 0,
	rituales: 0,
	cultodemoniaco: 0,
	arquitectura: 0,
	rutasdecontrabando: 0,
	profundidadcuevas: 0,
	esclavitud: 0,
	patriotismo: 0,
	serviciomilitar: 0,
	torturas: 0,
	aduanas: 0,
	naturaleza: 0,
	libertadpolitica: 0,
	burguesia: 0,
	gremios: 0,
	lamujer: 0,
	nobleza: 0,
	justicia: 0,
	medicina: 0,
	escuelas: 0,
	musica: 0,
};
var imperioFantasma = {
	cargaImperio: function () {
		if (LOCAL.getPoliticas() == null) {
			imperioFantasma.cargaFantasma("https://www.empire-strike.com/politica.php", imperioFantasma.getPoliticas, LOCAL.setPoliticas);
		}
		if (LOCAL.getGobernantes() == null) {
			imperioFantasma.cargaFantasma("https://www.empire-strike.com/gobierno.php", imperioFantasma.getGobiernantes, LOCAL.setGobernantes);
		}
		if (LOCAL.getClan() ==+ null && LOCAL.getImperio().clan != "") {
			var urlClan = "https://www.empire-strike.com/clanes.php";
			imperioFantasma.cargaFantasma(urlClan, imperioFantasma.getMaravillas, LOCAL.setClan);
		}
	},
	cargaFantasma: function (url, funcionLectura, funcionCarga) {
		fetch(url)
			.then((response) => {
				// Verifica si la solicitud fue exitosa (código de estado 200)
				if (response.status === 200) {
					console.log('response.text():', response.text);
					return response.text(); // Obtiene el contenido HTML como texto
				} else {
					throw new Error("Error en la solicitud");
				}
			})
			.then((html) => {
				// Parsea el HTML y extrae información
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");
				// Utiliza métodos DOM para acceder y extraer datos
				funcionCarga(funcionLectura(doc));
				return funcionLectura(doc);
			})
			.catch((error) => {
				console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
			});
	},
	getMaravillas: function (doc) {
		var miClan = {
			maravilla1: null,
			maravilla2: null,
		};
		if (doc.getElementById("_ayudam1") == null) return miClan;
		miClan.maravilla1 = doc.querySelector("#_ayudam1 h3").innerText;

		if (doc.getElementById("_ayudam2") == null) return miClan;
		miClan.maravilla2 = doc.querySelector("#_ayudam2 h3").innerText;
		return miClan;
	},
	getGobiernantes: function (doc) {
		var gobernantes = [];
		var n_regiones = 0;
		switch (GLOBAL.getPartida()) {
			case "KENARON":
			case "GARDIS":
				n_regiones = 30;
				break;
			case "ZULA":
			case "NUMIAN":
				n_regiones = 16;
				break;
			case "FANTASY":
				n_regiones = 15;
		}
		for (i = 1; i <= n_regiones; i++) {
			gobernantes[i] = doc
				.getElementById("region" + i)
				.innerText.trim()
				.substring(0, 3);
		}
		return gobernantes;
	},
	getPoliticas: function (doc) {
		var politica = {};
		doc.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
			if (index == 0 || obj.children.length < 3) return;
			var contador = 0;
			for (var i = 0; i < 10; i++) {
				if (obj.children[4].children[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png") contador = contador + 1;
				else break;
			}
			var nombre = obj.children[1].innerText.trim().split("Coste: ");
			politica[imperioFantasma.normalizar(nombre[0])] = contador;
		});
		return politica;
	},
	//borra tildes, espacios, y transforma en minusculas.
	normalizar: function (str) {
		return str
			.toLowerCase()
			.replaceAll(" ", "")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	},
};

function alwaysDo() {
	// ------------- Forzar fuente específica ------------- //

	// document.body.style.fontFamily = 'Times New Roman';
	var elements = document.querySelectorAll(".lista2 td");
	elements.forEach(function (element) {
		element.style.fontSize = "0.9em";
	});

	// ------------- EXPERIMENTAL ------------- //

	// Insertar estilos CSS adicionales
	var css = `
        .error-container {
            display: flex;
            align-items: start; /* Alinea verticalmente al inicio */
            gap: 10px; /* Espacio entre la tabla y el mensaje */
        }
    `;

	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = css;
	document.head.appendChild(styleSheet);

	var botonaZong = new Audio(chrome.runtime.getURL("base/button.mpeg"));
	var accion = function () {
		var carga = {
			mode: true,
			type: "imperio",
			init: location.href,
		};
		LOCAL.setCarga(carga);
		GLOBAL.cargaImperio();
		if (!LOCAL.getCarga()) botonaZong.play();
	};
	var botonazo = GLOBAL.crearBoton("#subcabecera", "Apretame este Boton", accion);
	botonazo.style = "height: 35px";
	var iframe = document.createElement("iframe");
	var elementoLista = document.createElement("li");
	elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
	document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
	document.querySelector("#sinfo  ul").children[2].before(elementoLista);
	imperioFantasma.cargaImperio();
}

var GLOBAL = {
	consolelog2: function () {
		const obj1 = LOCAL.getPoliticas();
		const obj2 = politics;

		const isEqual = JSON.stringify(obj1) === JSON.stringify(obj2);
		console.log(isEqual); // true si son iguales, false si no
		console.log("LOCAL.getPoliticas():", LOCAL.getPoliticas());
		console.log("politics:", politics);
		console.log("LOCAL.getPoliticas() === politics:", LOCAL.getPoliticas() == politics);
	},

	showError: function (msg, container, time) {
		var mensajeError = document.createElement("div");
		mensajeError.className = "mensajeError";
		mensajeError.innerHTML = msg;
		container.appendChild(mensajeError);

		if (time != undefined) {
			setTimeout(function () {
				container.querySelector(".mensajeOk").forEach(function callback(obj, index) {
					if (obj.innerText == msg) obj.remove();
				});
			}, time * 1000);
		}
	},
	showInfo: function (msg, time) {
		var mensajeOk = document.createElement("div");
		mensajeOk.className = "mensajeOk";
		mensajeOk.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeOk);

		if (time != undefined) {
			setTimeout(function () {
				document
					.getElementById("contenido")
					.querySelector(".mensajeOk")
					.forEach(function callback(obj, index) {
						if (obj.innerText == msg) obj.remove();
					});
			}, time * 1000);
		}
	},
	showMessage: function (msg, time) {
		var mensajeInfo = document.createElement("div");
		mensajeInfo.className = "mensajeInfo";
		mensajeInfo.innerHTML = msg;
		document.getElementById("contenido").prepend(mensajeInfo);

		if (time != undefined) {
			setTimeout(function () {
				document
					.getElementById("contenido")
					.querySelector(".mensajeOk")
					.forEach(function callback(obj, index) {
						if (obj.innerText == msg) obj.remove();
					});
			}, time * 1000);
		}
	},
	showConsole: function (data) {
		console.error("EXTENSION EXCEPTION\n" + data.responseText);
	},
	getPartida: function () {
		return $(
			$("#_infopartida")
				.contents()
				.filter(function () {
					return this.nodeType == Node.TEXT_NODE;
				})[1],
		)
			.text()
			.trim()
			.replace("(Ronda ", "")
			.replace(")", "")
			.split(" ")[0];
	},
	getClanCantidad: function () {
		switch (GLOBAL.getPartida()) {
			case "KENARON":
				return 20;
			case "GARDIS":
			case "ZULA":
				return 10;
			case "NUMIAN":
				return 5;
			case "FANTASY":
				return 3;
			default:
				return 0;
		}
	},
	/*generateAsedios : function()
	{
		return false;
	},*/
	getRonda: function () {
		return parseInt(
			$(
				$("#_infopartida")
					.contents()
					.filter(function () {
						return this.nodeType == Node.TEXT_NODE;
					})[1],
			)
				.text()
				.trim()
				.replace("(Ronda ", "")
				.replace(")", "")
				.split(" ")[1],
		);
	},
	getFechaFin: function () {
		return $("#_infopartida .fecha_local").text();
	},
	getHorasProteccion: function () {
		return parseInt(
			$(
				$("#_infopartida")
					.contents()
					.filter(function () {
						return this.nodeType == Node.TEXT_NODE;
					})[4],
			)
				.text()
				.trim()
				.substring(0, 2),
		);
	},
	showOpcionesDisponibles: function () {
		$("<div style='position: absolute; border-radius: 5px; border: 2px solid #35771F; padding: 5px; margin: 10px'><b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b></div>").insertBefore("#subcabecera");
	},
	crearBoton: function (donde, nombre, accion) {
		//crear boton
		const button = document.createElement("button");
		button.type = "button";
		button.innerText = nombre;
		button.onclick = accion;
		button.className = "boton-papiro";
		const parentElement = document.querySelector(donde);
		if (parentElement) {
			parentElement.appendChild(button);
			return button;
		} else {
			console.error("No se encontró el elemento con el selector:", donde);
			return null;
		}
		//boton creado
	},
	crearVinculo: function (donde, texto, accion) {
		const a = document.createElement("a");
		a.onclick = accion;
		a.text = texto;
		document.querySelector(donde).appendChild(a);
		return a;
	},
	checkNews: function () {
		API.getNews(function (data) {
			if (data == null) return;

			var manifestExtension = chrome.runtime.getManifest();
			if (manifestExtension.version != data.Version) GLOBAL.showMessage("Nueva versión disponible de la extensión. <a target='_blank' href='" + url + "/ActualizacionManual'>¿Como la actualizo?</a> <a target='_blank' href='" + url + "/Release/" + data.Version.replace(".", "_") + "'>¿Que hay de nuevo?</a>");

			//if(data.Mensajes.length > 0)
			//$("#notificaciones").append("<a style='padding-left: 28px;padding-bottom: 14px; background: url(" + chrome.runtime.getURL('base/puzzle.png') + "); background-size: 28px;'><span id='g_sucesos' data-r='0'>0</span></a>");
		});
	},
	getCode: function () {
		API.getCodigo();
	},
	updateRecursos: function () {
		if (LOCAL.getImperio() == null) return;

		if ($("#g_turnos").length == 0) return;

		var updateRecurso = true;
		if (LOCAL.getRecurso() != null) {
			var turnos = parseInt($("#g_turnos").html().replace(/\./g, ""));
			if (LOCAL.getRecurso().turnos == turnos) updateRecurso = false;
		}

		if (updateRecurso) API.setRecurso(LOCAL.getImperio().guidImperio, GLOBAL.getPartida(), GLOBAL.getRonda(), parseInt($("#g_turnos").html().replace(/\./g, "")), parseInt($("#g_mana").html().replace(/\./g, "")), parseInt($("#g_karma").html().replace(/\./g, "")), parseInt($("#g_oro").html().replace(/\./g, "")), parseInt($("#g_alimentos").html().replace(/\./g, "")), parseInt($("#g_agua").html().replace(/\./g, "")), parseInt($("#g_hierro").html().replace(/\./g, "")), parseInt($("#g_piedra").html().replace(/\./g, "")), parseInt($("#g_madera").html().replace(/\./g, "")), parseInt($("#g_mithril").html().replace(/\./g, "")), parseInt($("#g_plata").html().replace(/\./g, "")), parseInt($("#g_gemas").html().replace(/\./g, "")), parseInt($("#g_herramientas").html().replace(/\./g, "")), parseInt($("#g_bloques").html().replace(/\./g, "")), parseInt($("#g_tablas").html().replace(/\./g, "")), parseInt($("#g_reliquias").html().replace(/\./g, "")), parseInt($("#g_joyas").html().replace(/\./g, "")), parseInt($("#g_cristal").html().replace(/\./g, "")), parseInt($("#g_armas").html().replace(/\./g, "")), parseInt($("#g_rubies").html().replace(/\./g, "")));
	},
	gobiernoRegion: function () {
		// console.log("Funcion gobiernoRegion:");
		var gobernante = [];
		var N_regiones = 0;
		// console.log("GLOBAL.getPartida():", GLOBAL.getPartida());
		switch (GLOBAL.getPartida()) {
			case "KENARON":
			case "GARDIS":
				N_regiones = 30;
				break;
			case "ZULA":
			case "NUMIAN":
				N_regiones = 16;
				break;
			case "FANTASY":
				N_regiones = 15;
		}
		var gobernas = false;
		// console.log("N_regiones:", N_regiones);
		function getGobernantesFromLocalStorage() {
			// Obtener el valor de 'Gobernantes' de localStorage
			const gobernantesString = localStorage.getItem("Gobernantes");

			// Parsear el valor a un array de JavaScript
			var gobernantesArray;
			try {
				gobernantesArray = JSON.parse(gobernantesString);
			} catch (e) {
				// console.error("Error al parsear los gobernantes del localStorage:", e);
				// Puedes retornar un valor predeterminado o manejar el error de alguna otra manera
				return null;
			}

			return gobernantesArray;
		}
		const gobernantes = getGobernantesFromLocalStorage();
		// var gobernas = false;
		function gobiernoRegion(region) {
			if (!gobernantes || typeof gobernantes[region] === "undefined") {
				gobernantes[region] = "000";
				// return false;
			} else {
				// console.log('gobernantes[region]:', gobernantes[region]);
				gobernas = true;
				// return gobernantes[region] === LOCAL.getImperio().clan;
			}
			// console.log('gobernas:', gobernas);
			return gobernas;
		}
		/*for (var i = 1; i <= N_regiones; i++) {
			// console.log("entra:", i);
			// console.log("gobernante[i]:", gobernante[i]);
				gobiernoRegion;(N_regiones);
			if (LOCAL.getGobernantes().children[i] == null) {
				LOCAL.getGobernantes().children[i] = "000";
				console.log("LOCAL.getGobernantes().children[i]:", LOCAL.getGobernantes().children[i]);
				gobernante[i] = "000";
				console.log("gobernante[i]:", gobernante[i]);
			}
			console.log("getGobernantes().children no predefinidos:");
			if (gobernante[i] != LOCAL.getImperio().clan) {
				console.log("Gobernas la región:", gobernante[i]);
				console.log("Lamentablemente, no", false);
				// gobernas = false;
			} else {
				console.log("(gobernante[i] == LOCAL.getImperio().clan):", gobernante[i] == LOCAL.getImperio().clan);
				console.log("gobernante[i]:", gobernante[i]);
				console.log("LOCAL.getImperio().clan:", LOCAL.getImperio().clan);
				console.log("Gobernas?", true);
				gobernas = true;
			}
		}*/
		// console.log("gobernas:", gobernas);
		return gobernas;
	},

	/*gobiernoRegion: function () {
		console.log("Funcion gobiernoRegion:");
		var gobernante = [];
		var N_regiones = 0;
		console.log("GLOBAL.getPartida():", GLOBAL.getPartida());
		switch (GLOBAL.getPartida()) {
			case "KENARON":
			case "GARDIS":
				N_regiones = 30;
				break;
			case "ZULA":
			case "NUMIAN":
				N_regiones = 16;
				break;
			case "FANTASY":
				N_regiones = 15;
		}
		var gobernas = false;
		console.log("N_regiones:", N_regiones);
		for (var i = 1; i <= N_regiones; i++) {
			console.log('entra:', i);
			console.log('LOCAL.Gobernantes:', LOCAL.getGobernantes().children[i]);
			console.log('gobernante[i]:', gobernante[i]);

			if (LOCAL.getGobernantes().children[i] == null) {
				LOCAL.getGobernantes().children[i] = "000";
				console.log('LOCAL.getGobernantes().children[i]:', LOCAL.getGobernantes().children[i]);
				gobernante[i] = "000";
				console.log('gobernante[i]:', gobernante[i]);
			}
			console.log('getGobernantes().children no predefinidos:');
			if (gobernante[i] != LOCAL.getImperio().clan) {
				console.log('Gobernas la región:', gobernante[i]);
				console.log("Lamentablemente, no", false);
				// gobernas = false;
			} else {
				console.log("(gobernante[i] == LOCAL.getImperio().clan):", gobernante[i] == LOCAL.getImperio().clan);
				console.log("gobernante[i]:", gobernante[i]);
				console.log("LOCAL.getImperio().clan:", LOCAL.getImperio().clan);
				console.log("Gobernas?", true);
				gobernas = true;
			}
		}
		console.log('gobernas:', gobernas);
		return gobernas;
	},*/
	cargaImperio: function () {
		var contadorPol = 0;
		if (LOCAL.getCarga() == null) return;
		if (LOCAL.getCarga()["mode"] && LOCAL.getCarga()["type"] == "imperio") {
			if (LOCAL.getImperio() == null) {
				location.replace("tuimperio.php");
				return;
			}
			if (LOCAL.getPoliticas() == null) {
				location.replace("politica.php");
				return;
			} else {
				const obj1 = LOCAL.getPoliticas();
				const obj2 = politics;

				const isEqual = JSON.stringify(obj1) === JSON.stringify(obj2);
				console.log(isEqual); // true si son iguales, false si no
				console.log("LOCAL.getPoliticas():", LOCAL.getPoliticas());
				console.log("politics:", politics);
				if (isEqual) {
					location.replace("politica.php");
					return;
				}
			}
			if (LOCAL.getGobernantes() == null) {
				location.replace("gobierno.php");
				return;
			}
			if (LOCAL.getClan() == null && LOCAL.getImperio().clan != "") {
				location.replace("clan.php?sclan=" + LOCAL.getImperio().clan);
				return;
			}
			if (location.href != LOCAL.getCarga()["init"]) location.replace(LOCAL.getCarga()["init"]);
			localStorage.removeItem("Carga");
		}
	},
	cargaHeroe: function () {
		if (LOCAL.getHeroe() != null) {
			var heroes = LOCAL.getHeroe();
			var count = 0;
			for (var i = heroes.length - 1; i >= 0; i--) {
				if (!heroes[i].cargada) {
					location.replace(heroes[i].link);
					return;
				}
			}
		} else location.replace("tuimperio.php");
	},
	cargaCiudad: function () {
		if (LOCAL.getCiudad() != null) {
			var ciudades = LOCAL.getCiudad();
			var count = 0;
			for (var i = ciudades.length - 1; i >= 0; i--) {
				if (!ciudades[i].cargada) {
					location.replace("ciudad.php?id=" + ciudades[i].idCiudad);
					return;
				}
			}
		} else location.replace("tuimperio.php");
	},
};

function moveAsedios(e) {
	var div = document.getElementById("asedios");
	div.style.position = "absolute";
	div.style.top = parseInt(e.clientY) - 20 + "px";
	div.style.left = parseInt(e.clientX) - 20 + "px";
}

function desmarcarAsedio(idCiudad) {
	var asedio = LOCAL.getAsedio(idCiudad);

	$(".marcarAsedio_" + idCiudad).each(function (index, obj) {
		$(obj).css("color", "#006400");
		$(obj).text("[Marcar]");
	});

	asedio.marcado = false;
	LOCAL.setAsedio(asedio);
}
