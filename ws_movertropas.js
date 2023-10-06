function movertropas() {
	var autoAtack = LOCAL.getautoA();
	var formaciones = [];
	if (LOCAL.getFormaciones() != null) formaciones = LOCAL.getFormaciones();
	window.addEventListener("keydown", function (event) {
		if (event.key == "q")
			cargarFormacion("o", $("#formacionesGuardadas").val());
	});
	window.addEventListener("keydown", function (event) {
		if (event.key == "w")
			cargarFormacion("d", $("#formacionesGuardadas").val());
	});
	$(".lista2 tr").each(function (index, obj) {
		if (index == 0) return;
		if (
			$(obj.children[0]).text() == "Total por niveles" ||
			$(obj.children[0]).text() == "Nombre"
		)
			return;
		creaBoton(obj, "Save", function () {
			guardarFormacion(obj);
		});
	});
	$("body").append(
		`<a id="submit_tropas" style="display: none;" onclick="submit_page();">pedir tabla de tropas</a>`,
	);
	document.getElementById("submit_tropas").click();
	actualizar();
	const elementToObserve = document.querySelector("#movera");
	// create a new instance of `MutationObserver` named `observer`,
	// passing it a callback function
	const observer = new MutationObserver(function () {
		actualizar();
	});
	// passing it the element to observe, and the options object
	observer.observe(elementToObserve, {
		subtree: true,
		childList: true,
	});

	function guardarFormacion(obj) {
		var tropas = [];

		function obtenerNombreCiudad(texto) {
			// Reemplaza el patrón # seguido de números y un espacio con un string vacío
			return texto.replace(/#\d+\s/, "");
		}
		var innerText = "#69 0001";
		var nombreCiudad = obtenerNombreCiudad(innerText);
		var nombre = window.prompt(
			"ingrese el nombre de la formacion que desea Guardar",
			GLOBAL.getPartida().substring(0, 3) +
				" - " +
				obj.children[1].innerText +
				" - " +
				nombreCiudad,
		);
		if (nombre == null) return;
		for (var i = 2; i <= 21; i++) {
			tropas[i - 2] = parseInt(
				$(obj.children[i].querySelector("span")).text(),
			);
		}
		var selected = false;
		var _formacion = generarFormacion(nombre, tropas, selected);
		formaciones.push(_formacion);
		LOCAL.setFormaciones(formaciones);
		obj = $("#formacionesGuardadas");
		if (obj != null) {
			obj.append(
				`<option id="formacion${_formacion["nombre"]}" value="${_formacion["nombre"]}">${_formacion["nombre"]}</option>`,
			);
		}
	}

	function cargarFormacion(donde, nombre) {
		if (nombre != 0 && nombre != null) {
			var _n =
				document.querySelector(
					"#movera > form > table.lista1.tabla_mt > tbody",
				).children.length - 1;
			for (var index in formaciones) {
				if (formaciones[index]["nombre"] == nombre) {
					formaciones[index]["selected"] = true;
					for (var i = 1; i <= _n; i++) {
						document.getElementById("tropa" + donde + i).value =
							formaciones[index]["formacion"][i - 1];
						if (donde == "o") actualizad(i);
						else actualizao(i);
					}
					document.getElementById("calcula").click();
				} else {
					formaciones[index]["selected"] = false;
				}
			}
			LOCAL.setFormaciones(formaciones);
		}
	}

	function borrarFormacion(nombre) {
		for (var index in formaciones) {
			if (formaciones[index]["nombre"] == nombre) {
				formaciones.splice(index, 1);
				LOCAL.setFormaciones(formaciones);
				document.getElementById("formacion" + nombre).remove();
				return;
			}
		}
	}

	function generarFormacion(nombre, formacion, selected) {
		return {
			nombre: nombre,
			formacion: formacion,
			selected: selected,
		};
	}

	function actualizar() {
		if ($(".lista1 .tabla_mt").text().length != 0) {
			if ($("#magiapura").text().length == 0) {
				$(".lista1 .tabla_mt").append("<tr id=magiapura></tr>");
				$("#magiapura").append(
					`<td id="formaciones" ><select id=formacionesGuardadas><option value="0">- - Escoge - -</option></select></td>`,
				);
				GLOBAL.crearBoton("#formaciones", "Borrar", function () {
					borrarFormacion($("#formacionesGuardadas").val());
				});
				for (var i in formaciones) {
					$("#formacionesGuardadas").append(
						`<option id="formacion${formaciones[i]["nombre"]}" value="${formaciones[i]["nombre"]}">${formaciones[i]["nombre"]}</option>`,
					);
					if (formaciones[i]["selected"])
						document.getElementById("formacionesGuardadas").value =
							formaciones[i]["nombre"];
				}
				$("#magiapura").append(
					`<td width="35%" id=cargaro>cargar origen</td>`,
				);
				GLOBAL.crearBoton("#cargaro", "Cargar", function () {
					cargarFormacion("o", $("#formacionesGuardadas").val());
				});
				$("#magiapura").append(
					`<td width="35%" id=cargard>cargar destino</td>`,
				);
				GLOBAL.crearBoton("#cargard", "Cargar", function () {
					cargarFormacion("d", $("#formacionesGuardadas").val());
				});
				$("#magiapura").append(
					`<a id="calcula" style="display: none;" onclick="calculapotencial();">calcula</a>`,
				);
				/// conteo de tropas
				function verificarPorcentaje(elemento) {
					let valor = parseInt(
						elemento.innerText.replace("%", ""),
						10,
					);
					return valor >= 5;
				}
				// Definimos los niveles de tropa según la lista que proporcionaste
				const nivelesTropas = [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24,
					26, 30, 45,
				];
				// Inicializamos contadores para origen y destino
				let countOrigen = 0;
				let countDestino = 0;
				// Obtener todos los elementos con clase 'porcentajetropas'
				const elementosPorcentaje =
					document.querySelectorAll(".porcentajetropas");
				// Filtramos los elementos basados en su ID y el porcentaje
				for (let elemento of elementosPorcentaje) {
					if (
						elemento.id.startsWith("poro") &&
						nivelesTropas.includes(
							parseInt(elemento.id.replace("poro", ""), 10),
						) &&
						verificarPorcentaje(elemento)
					) {
						countOrigen++;
					} else if (
						elemento.id.startsWith("pord") &&
						nivelesTropas.includes(
							parseInt(elemento.id.replace("pord", ""), 10),
						) &&
						verificarPorcentaje(elemento)
					) {
						countDestino++;
					}
				}
				console.log(
					`Hay ${countOrigen} elementos de origen con un porcentaje de 5 o más.`,
				);
				console.log(
					`Hay ${countDestino} elementos de destino con un porcentaje de 5 o más.`,
				);
				/// fin conteo de tropas
			}
		}
	}

	function actualizad(m) {
		var input = document.getElementById("tropao" + m),
			max_tropa =
				parseInt(document.getElementById("tropainicialo" + m).value) +
				parseInt(document.getElementById("tropainiciald" + m).value);
		if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
			input.value = 0;
		} else if (input.value > max_tropa) {
			input.value = max_tropa;
		}
		var valor = max_tropa - parseInt(input.value);
		document.getElementById("tropad" + m).value = valor;
		$('.slider[data-tropa="' + m + '"]')
			.parent()
			.find("a")
			.css("left", parseInt((valor * 100) / max_tropa) + "%");
	}

	function actualizao(m) {
		var input = document.getElementById("tropad" + m),
			max_tropa =
				parseInt(document.getElementById("tropainicialo" + m).value) +
				parseInt(document.getElementById("tropainiciald" + m).value);
		if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
			input.value = 0;
		} else if (input.value > max_tropa) {
			input.value = max_tropa;
		}
		document.getElementById("tropao" + m).value =
			max_tropa - parseInt(input.value);
		$('.slider[data-tropa="' + m + '"]')
			.parent()
			.find("a")
			.css("left", parseInt((input.value * 100) / max_tropa) + "%");
	}
	// Auto ataque
	if (autoAtack) {
		if (document.getElementById("potencial2").value == 18735) {
			location.replace("escogerobjetivo.php?idho=60");
		} else {
			// carga la formación
			document.querySelector("#cargard > button").click();
			// Mueve las tropas
			document.getElementById("boton_submit").click();
		}
	}

	function conteoTropasActivas() {
		if ($(".lista1 .tabla_mt").text().length != 0) {
			// Seleccionamos todos los elementos con la clase "porcentajetropas"
			var porcentajes = document.querySelectorAll(".porcentajetropas");
			// Inicializamos un contador
			var count = 0;
			// Iteramos sobre cada elemento de porcentaje
			porcentajes.forEach(function (porcentajeElem) {
				// Obtenemos el texto interior (el porcentaje)
				var texto = porcentajeElem.innerText;
				// Eliminamos el símbolo '%' y lo convertimos a un número entero
				var valor = parseInt(texto.replace("%", ""), 10);
				// Verificamos si el valor es 5 o más y, en caso afirmativo, incrementamos el contador
				if (valor >= 5) {
					count++;
				}
			});
			console.log(`Hay ${count} elementos con un porcentaje de 5 o más.`);
		}
	}
}

function creaBoton(obj, nombre, accion) {
	//crear boton
	const button = document.createElement("button");
	button.type = "button";
	button.innerText = nombre;
	button.onclick = accion;
	button.className = "boton-papiro";
	obj.appendChild(button);
	return button;
	//boton creado
}
