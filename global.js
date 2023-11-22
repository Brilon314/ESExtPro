var _NONE = 0;
var _ASEDIO = 1;
var _REGIONES = 2;
var _RECONQUISTA = 3;
var _INFORME = 1;
var _INFORMECOMPARTIDO = 2;
var idClan = 0;
var clansResult = [];
var clans = [];
var listaClanesLinks = [];
var ccclans = [];
var ccclans2 = [];
var nomclan = "";
var enlace = "";
var datos;
var listaClanes = [];

function alwaysDo() {
  // ------------- Forzar fuente específica ------------- //
  // document.body.style.fontFamily = 'Times New Roman';
  var elements = document.querySelectorAll(".lista2 td");
  elements.forEach(function(element) {
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
  var iframe = document.createElement("iframe");
  var elementoLista = document.createElement("li");
  elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
  document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
  document.querySelector("#sinfo  ul").children[2].before(elementoLista);
  ///   MENU COLAPSABLE
  // CSS para ocultar elementos
  const hideStyle = `
    .hidden-element {
        display: none !important;
    }
`;
  // Agregar el estilo al documento
  // var estilosBotonColapsar = document.createElement("style");
  // estilosBotonColapsar.type = "text/css";
  // estilosBotonColapsar.innerText = hideStyle;
  // document.head.appendChild(estilosBotonColapsar);
  // Obtener la posición del elemento
  var position = $("#hora > span").offset();
  // Creación del menú y añadirlo al cuerpo de la página
  // Creación del menú y añadirlo al cuerpo de la página
  // Creación del botón Extras y añadirlo al cuerpo de la página
  const btnExtras = $("<button>Extras</button>").appendTo("body");
  // Añadir estilos básicos para el botón
  $(btnExtras).css({
    position: "fixed",
    top: "10px",
    left: "50%",
    zIndex: 1000
  });
  // Creación del menú desplegable y añadirlo al cuerpo, inicialmente estará oculto
  const menuDesplegable = $("<div></div>").attr("id", "menuDesplegable").appendTo("body").hide();
  // Añadir estilos básicos para el menú desplegable
  $(menuDesplegable).css({
    position: "fixed",
    top: "50px",
    left: "50%",
    zIndex: 1001,
    padding: "10px",
    background: "white",
    border: "1px solid black"
  });
  // Creación de la opción de exportar dentro del menú desplegable
  const opcionExportar = $("<div>Exportar formaciones</div>").appendTo(menuDesplegable);
  $(opcionExportar).on("click", exportData);
  // Función para mostrar/ocultar el menú desplegable al hacer clic en el botón Extras
  $(btnExtras).on("click", function() {
    $(menuDesplegable).toggle();
  });
  // Función para exportar datos (la misma que tenías)
  function exportData() {
    const formaciones = localStorage.getItem('Formaciones');
    if (formaciones) {
      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1;
      var año = fechaActual.getFullYear();
      var fechaFormateada = dia + "-" + mes + "-" + año;
      const formaciones2 = localStorage.getItem('Imperio');
      var dataJSON = formaciones2;
      var objeto = JSON.parse(dataJSON);
      var nombre = objeto.nombre;
      var clan = objeto.clan;
      var nomArchivo = nombre + "_" + clan + "_" + fechaFormateada + ".json";
      descargarDatos(nomArchivo, formaciones);
    } else {
      alert('No hay formaciones guardadas para exportar.');
    }
  }
  // Función para descargar datos (la misma que tenías)
  function descargarDatos(nombreArchivo, contenido) {
    const blob = new Blob([contenido], {
      type: 'text/plain;charset=utf-8'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombreArchivo;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  ///   BOTON EXPORTAR FORMACIONES
  //   const showMenuButton = GLOBAL.crearBoton2("body", "Exportar formaciones", exportData);
  //   if (showMenuButton) {
  //     showMenuButton.id = "showMenuButton";
  //     $("#notificaciones").css("position", "relative");
  //     $(showMenuButton).insertBefore("#contenido");
  //     // Estilos para el botón
  //     $(showMenuButton).css({
  //       position: "fixed",
  //       top: "10px",
  //       left: "50%",
  //       zIndex: 1000
  //     });
  //   }
  //   // Función para exportar datos
  //   function exportData() {
  //     const formaciones = localStorage.getItem('Formaciones');
  //     if (formaciones) {
  //       var fechaActual = new Date();
  // // Si deseas obtener la fecha en un formato específico, puedes hacer algo como lo siguiente:
  // var dia = fechaActual.getDate();
  // var mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
  // var año = fechaActual.getFullYear();
  // // Formatear la fecha en una cadena de texto
  // var fechaFormateada = dia + "-" + mes + "-" + año;
  //       const formaciones2 = localStorage.getItem('Imperio');
  //       var dataJSON = formaciones2; // Aquí se colocaría todo el JSON
  //       var objeto = JSON.parse(dataJSON);
  //       var nombre = objeto.nombre;
  //       var clan = objeto.clan;
  //       var nomArchivo = nombre + "_" + clan + "_" + fechaFormateada+".json";
  //       console.log('nomArchivo:', nomArchivo);
  //       descargarDatos(nomArchivo, formaciones);
  //     } else {
  //       alert('No hay formaciones guardadas para exportar.');
  //     }
  //   }
  //   // Función para descargar datos
  //   function descargarDatos(nombreArchivo, contenido) {
  //     const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
  //     const a = document.createElement('a');
  //     a.href = URL.createObjectURL(blob);
  //     a.download = nombreArchivo;
  //     a.style.display = 'none';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }
  ///   FIN BOTON EXPORTAR FORMACIONES
  // Eliminamos el tooltip ya que ya no aplica la funcionalidad de mostrar/ocultar
  // Usar la función crearBoton para agregar el botón justo antes del #contenido
  /*  function toggleMenu() {
        const menu = $("#menu");
        const cabecera = $("#cabecera");
      if (menu.hasClass("hidden-element")) {
        menu.removeClass("hidden-element");
        cabecera.removeClass("hidden-element");
        menu.show();
        cabecera.show();
      } else {
        menu.addClass("hidden-element");
        cabecera.addClass("hidden-element");
        menu.hide();
        cabecera.hide();
      }
    }*/
  cargaImperio2();
  // Agregar los estilos al documento
}
var GLOBAL = {
  showError: function(msg, container, time) {
    var mensajeError = document.createElement("div");
    mensajeError.className = "mensajeError";
    mensajeError.innerHTML = msg;
    container.appendChild(mensajeError);
    if (time != undefined) {
      setTimeout(function() {
        container.querySelector(".mensajeOk").forEach(function callback(obj, index) {
          if (obj.innerText == msg) obj.remove();
        });
      }, time * 1000);
    }
  },
  showMessage: function(msg, time) {
    var mensajeInfo = document.createElement("div");
    mensajeInfo.className = "mensajeInfo";
    mensajeInfo.innerHTML = msg;
    document.getElementById("contenido").prepend(mensajeInfo);
    if (time != undefined) {
      setTimeout(function() {
        document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj, index) {
          if (obj.innerText == msg) obj.remove();
        });
      }, time * 1000);
    }
  },
  showConsole: function(data) {
    console.error("EXTENSION EXCEPTION\n" + data.responseText);
  },
  getPartida: function() {
    return $($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[1], ).text().trim().replace("(Ronda ", "").replace(")", "").split(" ")[0];
  },
  getClanCantidad: function() {
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
  gobiernoRegion: function(region) {
    return LOCAL.getGobernantes()[region] == LOCAL.getImperio().clan;
  },
  getRonda: function() {
    return parseInt($($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[1], ).text().trim().replace("(Ronda ", "").replace(")", "").split(" ")[1], );
  },
  getFechaFin: function() {
    return $("#_infopartida .fecha_local").text();
  },
  getHorasProteccion: function() {
    return parseInt($($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[4], ).text().trim().substring(0, 2), );
  },
  showOpcionesDisponibles: function() {
    $("<div style='position: absolute; border-radius: 5px; border: 2px solid #35771F; padding: 5px; margin: 10px'><b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b></div>").insertBefore("#subcabecera");
  },
  crearBoton: function(donde, nombre, accion) {
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
  },
  crearBoton2: function(donde, nombre, accion) {
    //crear boton
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = nombre;
    button.onclick = accion;
    button.className = "boton_bloque";
    const parentElement = document.querySelector(donde);
    if (parentElement) {
      parentElement.appendChild(button);
      return button;
    } else {
      console.error("No se encontró el elemento con el selector:", donde);
      return null;
    }
  },
  cargaImperio: function() {
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
  cargaHeroe: function() {
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
  cargaCiudad: function() {
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

function cargaImperio2() {
  // var listaClanes = [];
  if (LOCAL.getPoliticas() == null) {
    cargaFantasma(location.origin + "/politica.php", getPoliticas, LOCAL.setPoliticas);
  }
  if (LOCAL.getGobernantes() == null) {
    cargaFantasma(location.origin + "/gobierno.php", getGobiernantes, LOCAL.setGobernantes);
  }
  // siglaBuscada = obtenerClanImperio();
  async function ejecutarFuncionesEnOrden() {
    try {
      siglaBuscada = await obtenerClanImperio();
      listaClanes = await getSiglaAndLink();
      enlace = await obtenerLinkPorSigla(siglaBuscada);
      datos = await obtenerMaras(enlace);
      await mostrarMensaje();
    } catch (error) {
      console.error("Ocurrió un error al ejecutar las funciones:", error);
    }
  }
  ejecutarFuncionesEnOrden();

  function cargaFantasma(url, funcionLectura, funcionCarga) {
    fetch(url).then((response) => {
      // Verifica si la solicitud fue exitosa (código de estado 200)
      if (response.status === 200) {
        return response.text(); // Obtiene el contenido HTML como texto
      } else {
        throw new Error("Error en la solicitud");
      }
    }).then((html) => {
      // Parsea el HTML y extrae información
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      // Utiliza métodos DOM para acceder y extraer datos
      funcionCarga(funcionLectura(doc));
      return funcionLectura(doc);
    }).catch((error) => {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
    });
  }
  async function obtenerClanImperio() {
    try {
      const response2 = await fetch("https://www.empire-strike.com/tuimperio.php");
      if (response2.status !== 200) {
        throw new Error("Error en la solicitud");
      }
      const html = await response2.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const element = doc.querySelector("#datos > tbody > tr:nth-child(2) > td:nth-child(3)");
      if (element) {
        const content = element.textContent;
        const match = content.match(/\((.*?)\)/);
        if (match && match[1]) {
          nomclan = match[1];
          return nomclan; // Esto devolverá el texto entre paréntesis
        }
      }
      return null;
    } catch (error) {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
      throw error; // Re-lanza el error para que pueda ser capturado más adelante
    }
  }
  async function getSiglaAndLink() {
    try {
      const response = await fetch("https://www.empire-strike.com/listado_clanes.php");
      if (response.status !== 200) {
        throw new Error("Error en la solicitud");
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const table = doc.querySelector(".lista2");
      // const clans = [];
      for (var row of table.rows) {
        const cell = row.cells[1];
        if (cell) {
          const linkElement = cell.querySelector("a");
          const siglasMatch = cell.textContent.match(/\((\w+)\)/);
          if (linkElement && siglasMatch) {
            clans.push({
              siglas: siglasMatch[1],
              link: linkElement.getAttribute("href"),
            });
          }
        }
      }
      return clans;
    } catch (error) {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
      throw error;
    }
  }
  async function obtenerLinkPorSigla(sigla) {
    try {
      for (var i = 0; i < listaClanes.length; i++) {
        if (listaClanes[i].siglas === sigla) {
          return listaClanes[i].link;
        }
      }
    } catch (error) {
      console.error("Error obteniendo los clanes:", error);
    }
  }
  async function obtenerMaras(link_clan) {
    try {
      if (LOCAL.getClan() == null && LOCAL.getImperio().clan != "") {
        var urlClan = location.origin + "/" + link_clan;
        cargaFantasma(urlClan, getMaravillas, LOCAL.setClan);
      }
    } catch (error) {
      console.error("Error obteniendo los clanes:", error);
    }
  }
  async function mostrarMensaje() {
    try {
      console.log("Se cargaron todos los datos necesarios");
    } catch (error) {
      console.error("No se cargaron todos los datos necesarios.", error);
    }
  }
  // Llamar a la función
  function getMaravillas(doc) {
    var miClan = {
      maravilla1: null,
      maravilla2: null,
    };
    if (doc.getElementById("_ayudam1") == null) return miClan;
    miClan.maravilla1 = doc.querySelector("#_ayudam1 h3").innerText;
    if (doc.getElementById("_ayudam2") == null) return miClan;
    miClan.maravilla2 = doc.querySelector("#_ayudam2 h3").innerText;
    return miClan;
  }

  function getGobiernantes(doc) {
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
      gobernantes[i] = doc.getElementById("region" + i).innerText.trim().substring(0, 3);
    }
    return gobernantes;
  }

  function getPoliticas(doc) {
    var politica = {};
    doc.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
      if (index == 0 || obj.children.length < 3) return;
      var contador = 0;
      for (var i = 0; i < 10; i++) {
        if (obj.children[4].children[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png") contador = contador + 1;
        else break;
      }
      var nombre = obj.children[1].innerText.trim().split("Coste: ");
      politica[normalizar(nombre[0])] = contador;
    });
    return politica;
  }
  //borra tildes, espacios, y transforma en minusculas.
  function normalizar(str) {
    return str.toLowerCase().replaceAll(" ", "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

function desmarcarAsedio(idCiudad) {
  var asedio = LOCAL.getAsedio(idCiudad);
  $(".marcarAsedio_" + idCiudad).each(function(index, obj) {
    $(obj).css("color", "#006400");
    $(obj).text("[Marcar]");
  });
  asedio.marcado = false;
  LOCAL.setAsedio(asedio);
}

function moveAsedios(e) {
  var div = document.getElementById("asedios");
  div.style.position = "absolute";
  div.style.top = parseInt(e.clientY) - 20 + "px";
  div.style.left = parseInt(e.clientX) - 20 + "px";
}
//   const showMenuButton = GLOBAL.crearBoton2("body", "Mostrar/Ocultar", toggleMenu);
//   var posicionArriba = position.top;
//   var posicionIzquierda = position.left - 150;
//   var posicionRedondeada = Math.round(posicionIzquierda);
//   var testing = posicionIzquierda + "px";
//   if (showMenuButton) {
//     showMenuButton.id = "showMenuButton";
//     $("#notificaciones").css("position", "relative");
//     $(showMenuButton).insertBefore("#contenido");
//     // Estilos para el botón
//     $(showMenuButton).css({
//       position: "fixed",
//       // top: position.top + "px", // 50px debajo del elemento original
//       // left: posicionRedondeada + "px", // Alineado horizontalmente con el elemento original
//       top: "10px",
//       left: "50%",
//       zIndex: 1000 // Asegurarse de que esté encima de otros elementos
//     });
//   }
//   // tooltip
//   showMenuButton.title = "Haz clic para mostrar/ocultar el menú y la cabecera";
//   // Agregar un div para el tooltip
//   const tooltip = document.createElement("div");
//   tooltip.innerText = "Haz clic para mostrar/ocultar el menú y la cabecera";
//   tooltip.className = "custom-tooltip";
//   showMenuButton.appendChild(tooltip);
//   // Estilos CSS para el tooltip
//   const tooltipStyle = `
// .custom-tooltip {
//     display: none;
//     position: absolute;
//     top: -200px; // Ajusta según la posición deseada
//     left: 50%;
//     transform: translateX(-50%);
//     background-color: #333;
//     color: #fff;
//     padding: 5px;
//     border-radius: 5px;
//     font-size: 12px;
//     white-space: nowrap;
// }
// #showMenuButton:hover .custom-tooltip {
//     display: block;
// }
// `;
//   const styleElement = document.createElement("style");
//   styleElement.type = "text/css";
//   styleElement.innerText = tooltipStyle;
//   document.head.appendChild(styleElement);
/*
      checkNews: function () {
        API.getNews(function (data) {
          if (data == null) return;
          var manifestExtension = chrome.runtime.getManifest();
          if (manifestExtension.version != data.Version) GLOBAL.showMessage("Nueva versión disponible de la extensión. <a target='_blank' href='" + url + "/ActualizacionManual'>¿Como la actualizo?</a> <a target='_blank' href='" + url + "/Release/" + data.Version.replace(".", "_") + "'>¿Que hay de nuevo?</a>");
        });
      },
      getCode: function () {
        API.getCodigo();
      },
  },
  crearVinculo: function (donde, texto, accion) {
    const a = document.createElement("a");
    a.onclick = accion;
    a.text = texto;
    document.querySelector(donde).appendChild(a);
    return a;
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
    showInfo: function(msg, time) {
      var mensajeOk = document.createElement("div");
      mensajeOk.className = "mensajeOk";
      mensajeOk.innerHTML = msg;
      document.getElementById("contenido").prepend(mensajeOk);
      if (time != undefined) {
        setTimeout(function() {
          document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj, index) {
            if (obj.innerText == msg) obj.remove();
          });
        }, time * 1000);
      }
    },
     */