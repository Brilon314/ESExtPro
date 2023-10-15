function movertropas(func) {
  // var autoAtack = LOCAL.getautoA();
  var formaciones = [];
  if (LOCAL.getFormaciones() != null) formaciones = LOCAL.getFormaciones();
  window.addEventListener("keydown", function (event) {
    if (event.key == "q") cargarFormacion("o", $("#formacionesGuardadas").val());
  });
  window.addEventListener("keydown", function (event) {
    if (event.key == "w") cargarFormacion("d", $("#formacionesGuardadas").val());
  });
  $(".lista2 tr").each(function (index, obj) {
    if (index == 0) return;
    if ($(obj.children[0]).text() == "Total por niveles" || $(obj.children[0]).text() == "Nombre") return;
    creaBoton(obj, "Save", function () {
      guardarFormacion(obj);
    });
  });
  $("body").append(`<a id="submit_tropas" style="display: none;" onclick="submit_page();">pedir tabla de tropas</a>`);
  document.getElementById("submit_tropas").click();
  if (typeof func === "function") {
    actualizar();
    contarTropas2();
    // sisDef();
  }
  /// OBSERVER CANT DE TROPAS
  function handleMutations(mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList" || mutation.type === "characterData" || mutation.type === "subtree" || mutation.type === "attributes") {
        if (mutation.target === elementToObserve || Array.from(elementosArray).includes(mutation.target)) {
          if (document.getElementById("calcula") != null) {
            document.getElementById("calcula").click();
          }
          actualizar();
          contarTropas2();
          // sisDef();
          if (document.getElementById("calcula") != null) {
            document.getElementById("calcula").click();
          }
        }
      }
    }
  }
  const observerOptions = {
    childList: true,
    characterData: true,
    attributes: true,
    subtree: true,
  };
  const porcentajeObserver = new MutationObserver(handleMutations);
  // Convertir NodeList a Array
  const elementosArray = [...document.querySelectorAll(".porcentajetropas")];
  // Agregar #movera al array
  const elementToObserve = document.querySelector("#movera");
  // const elementToObserve2 = document.querySelector("#ido");
  // const elementToObserve3 = document.querySelector("#idd");
  elementosArray.push(elementToObserve);
  // elementosArray.push(elementToObserve2);
  // elementosArray.push(elementToObserve3);
  // Observar cada elemento en el array
  elementosArray.forEach((elemento) => {
    porcentajeObserver.observe(elemento, observerOptions);
  });
  /// FIN OBSERVER CANT DE TROPAS
  function guardarFormacion(obj) {
    var tropas = [];
    function obtenerNombreCiudad(texto) {
      // Reemplaza el patrón # seguido de números y un espacio con un string vacío
      return texto.replace(/#\d+\s/, "");
    }
    var nomCity = obj.children[0].innerText;
    var nombreCiudad = obtenerNombreCiudad(nomCity);
    var nombre = window.prompt("ingrese el nombre de la formacion que desea Guardar", GLOBAL.getPartida().substring(0, 3) + " - " + obj.children[1].innerText + " - " + nombreCiudad);
    if (nombre == null) return;
    for (var i = 2; i <= 21; i++) {
      tropas[i - 2] = parseInt($(obj.children[i].querySelector("span")).text());
    }
    var selected = false;
    var _formacion = generarFormacion(nombre, tropas, selected);
    formaciones.push(_formacion);
    LOCAL.setFormaciones(formaciones);
    obj = $("#formacionesGuardadas");
    if (obj != null) {
      obj.append(`<option id="formacion${_formacion["nombre"]}" value="${_formacion["nombre"]}">${_formacion["nombre"]}</option>`);
    }
  }

  function cargarFormacion(donde, nombre) {
    if (nombre != 0 && nombre != null) {
      var _n = document.querySelector("#movera > form > table.lista1.tabla_mt > tbody").children.length - 1;
      for (var index in formaciones) {
        if (formaciones[index]["nombre"] == nombre) {
          // console.log("formaciones[index][nombre]:", formaciones[index][nombre]);
          formaciones[index]["selected"] = true;
          for (var i = 1; i <= _n; i++) {
            document.getElementById("tropa" + donde + i).value = formaciones[index]["formacion"][i - 1];
            if (donde == "o") actualizad(i);
            else actualizao(i);
          }
          contarTropas2();
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
        $("#magiapura").append(`<td id="formaciones" ><select id=formacionesGuardadas><option value="0">- - Escoge - -</option></select></td>`);
        GLOBAL.crearBoton("#formaciones", "Borrar", function () {
          borrarFormacion($("#formacionesGuardadas").val());
        });
        for (var i in formaciones) {
          $("#formacionesGuardadas").append(`<option id="formacion${formaciones[i]["nombre"]}" value="${formaciones[i]["nombre"]}">${formaciones[i]["nombre"]}</option>`);
          if (formaciones[i]["selected"]) document.getElementById("formacionesGuardadas").value = formaciones[i]["nombre"];
        }
        $("#magiapura").append(`"<td width="35%" id=cargaro style="text-align: center;"></td>"`);
        GLOBAL.crearBoton("#cargaro", "Cargar", function () {
          cargarFormacion("o", $("#formacionesGuardadas").val());
        });

        $("#magiapura").append(`"<td width="35%" id=cargard style="text-align: center;"></td>"`);
        GLOBAL.crearBoton("#cargard", "Cargar", function () {
          cargarFormacion("d", $("#formacionesGuardadas").val());
        });

        $("#magiapura").append(`"<a id="calcula" style="display: none;" onclick="calculapotencial();">calcula</a>"`);
      }
      contarTropas2();
    }
    document.body.addEventListener("click", funcionClic);
  }
}

var contador = 0;
var countOrigen = 0;
var countDestino = 0;
var nomCity = 0;
var nombreCiudad = 0;
var nombreBuscado = 0;
var sistemaDefensivo = 0;
var sistemaDefensivo2 = 0;

function contarTropas2() {
  /// SISTEMAS DEEFENSIVOS

  function obtenerSistemaDefensivoPorNombre(nombreCiudad) {
    var ciudad = citys.find((ciudad) => ciudad.nombre === nombreCiudad);
    return ciudad ? ciudad.defensa : null;
  }

  var citys = JSON.parse(localStorage.getItem("Ciudades"));

  // Seleccionar el elemento que contiene el texto.
  if (document.querySelector('a[onclick="mover_todo_origen()"]') != null && document.querySelector('a[onclick="mover_todo_destino()"]') != null) {
    var element = document.querySelector('a[onclick="mover_todo_origen()"]');
    var element2 = document.querySelector('a[onclick="mover_todo_destino()"]');

    // Expresión regular para extraer el nombre de la ciudad.
    var match = element.textContent.match(/Mover todo a (.+?)\s*$/);
    var match2 = element2.textContent.match(/Mover todo a (.+?)\s*$/);

    // El nombre de la ciudad estará en matchX[1] si la expresión regular encuentra una coincidencia.
    var nomCiudad = match ? match[1] : null;
    var nomCiudad2 = match2 ? match2[1] : null;

    sistemaDefensivo = obtenerSistemaDefensivoPorNombre(nomCiudad);
    sistemaDefensivo2 = obtenerSistemaDefensivoPorNombre(nomCiudad2);
  }

  /// FIN SISTEMAS DEFENSIVOS

  function verificarPorcentaje(elemento) {
    var valor = parseInt(elemento.innerText.replace("%", ""), 10);
    return valor >= 5;
  }

  // // Definimos los niveles de tropa
  const nivelesTropas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  countOrigen = 0;
  countDestino = 0;

  // Obtener todos los elementos
  const elementosPorcentaje = document.querySelectorAll("#movera > form > table.lista1.tabla_mt > tbody .porcentajetropas");
  for (var elemento of elementosPorcentaje) {
    if (elemento.id.startsWith("poro") && nivelesTropas.includes(parseInt(elemento.id.replace("poro", ""), 10)) && verificarPorcentaje(elemento)) {
      countOrigen++;
    } else if (elemento.id.startsWith("pord") && nivelesTropas.includes(parseInt(elemento.id.replace("pord", ""), 10)) && verificarPorcentaje(elemento)) {
      countDestino++;
    }
  }
  const cargaroElement = $("#cargaro");
  const cargardElement = $("#cargard");

  var spaces = " ".repeat(3);

  if (cargaroElement.children().first().is("button")) {
    cargaroElement.prepend(`<span style="font-size: 2em; color: red;"><strong>` + spaces + countOrigen + spaces + `</strong></span>`);
    cargaroElement.prepend(`<img src="//images.empire-strike.com/archivos/sistemas_defensivos/40/` + sistemaDefensivo + `.jpg" width="25" height="25" alt="">`);
    cargardElement.prepend(`<span style="font-size: 2em; color: red;"><strong>` + spaces + countDestino + spaces + `</strong></span>`);
    cargardElement.prepend(`<img src="//images.empire-strike.com/archivos/sistemas_defensivos/40/` + sistemaDefensivo2 + `.jpg" width="25" height="25" alt="">`);
  } else {
    if (!cargaroElement.children().first().is("button")) {
      var spanElement = cargaroElement.find("span");
      if (spanElement.length) {
        spanElement.html(`<strong>` + spaces + countOrigen + spaces + `</strong>`);
      } else {
        cargaroElement.prepend(`<span style="font-size: 2em; color: red;"><strong>` + spaces + countOrigen + spaces + `   </strong></span>`);
        cargaroElement.prepend(`<img src="//images.empire-strike.com/archivos/sistemas_defensivos/40/` + sistemaDefensivo + `.jpg" width="25" height="25" alt="">`);
      }
    }

    if (!cargardElement.children().first().is("button")) {
      var spanElement2 = cargardElement.find("span");
      if (spanElement2.length) {
        spanElement2.html(`<strong>` + spaces + countDestino + spaces + `</strong>`);
      } else {
        cargardElement.prepend(`<span style="font-size: 2em; color: red;"><strong>` + spaces + countDestino + spaces + `</strong></span>`);
        cargardElement.prepend(`<img src="//images.empire-strike.com/archivos/sistemas_defensivos/40/` + sistemaDefensivo2 + `.jpg" width="25" height="25" alt="">`);
      }
    }
  }
}

function actualizad(m) {
  var input = document.getElementById("tropao" + m),
    max_tropa = parseInt(document.getElementById("tropainicialo" + m).value) + parseInt(document.getElementById("tropainiciald" + m).value);
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
    max_tropa = parseInt(document.getElementById("tropainicialo" + m).value) + parseInt(document.getElementById("tropainiciald" + m).value);
  if (input.value.length == 0 || isNaN(input.value) || input.value < 0) {
    input.value = 0;
  } else if (input.value > max_tropa) {
    input.value = max_tropa;
  }
  document.getElementById("tropao" + m).value = max_tropa - parseInt(input.value);
  $('.slider[data-tropa="' + m + '"]')
    .parent()
    .find("a")
    .css("left", parseInt((input.value * 100) / max_tropa) + "%");
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

function funcionClic(event) {
  //movertropas(actualizar);
  if (document.getElementById("calcula") != null) {
    contarTropas2();
    document.getElementById("calcula").click();
  }
}

// Auto ataque
/*if (autoAtack) {
    if (document.getElementById("potencial2").value == 18735) {
        location.replace("escogerobjetivo.php?idho=60");
    }
    else {
        // carga la formación
        document.querySelector("#cargard > button").click();
        // Mueve las tropas
        document.getElementById("boton_submit").click();
    }
}*/
