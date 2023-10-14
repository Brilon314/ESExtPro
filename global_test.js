function obtenerLinkPorSigla(sigla) {
  fetch(url).then((response) => {
    // Verifica si la solicitud fue exitosa (código de estado 200)
    if (response.status === 200) {
      return response.text(); // Obtiene el contenido HTML como texto
    } else {
      throw new Error("Error en la solicitud");
    }
  }).then((html) => {
      for (var i = 0; i < listaClanesLinks.length; i++) {
        console.log("contador:", i.toString());
        console.log("i:", i);
        console.log("listaClanesLinks.length:", listaClanesLinks.length);
        console.log("listaClanesLinks[i].siglas:", listaClanesLinks[i].siglas);
        if (listaClanesLinks[i].siglas === sigla) {
          return listaClanesLinks[i].link;
        }
      }
      return null; // Retorna null si no encuentra la sigla
    }.catch((error) => {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
    });
  }

  function getIdClan() {
    console.log("Entramos a getIdClan");
    fetch("https://www.empire-strike.com/listado_clanes.php").then((response) => {
      // Verifica si la solicitud fue exitosa (código de estado 200)
      if (response.status === 200) {
        return response.text(); // Obtiene el contenido HTML como texto
      } else {
        throw new Error("Error en la solicitud");
      }
    }).then((html) => {
      const html = response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const table = doc.querySelector(".lista2");
      console.log("tenemos la tabla");
      for (let row of table.rows) {
        const cell = row.cells[1];
        console.log('cell:', cell);
        console.log('row.cells[1]:', row.cells[1]);
        if (cell) {
          const linkElement = cell.querySelector("a");
          console.log('linkElement:', linkElement);
          const siglasMatch = cell.textContent.match(/\((\w+)\)/);
          console.log('siglasMatch:', siglasMatch);
          if (linkElement && siglasMatch) {
            clans.push({
              siglas: siglasMatch[1],
              link: linkElement.getAttribute("href"),
            });
          }
        }
      }
      console.log("clans de getIdClan:", clans);
      ccclans = JSON.stringify(clans);
      ccclans2 = clans;
      console.log("ccclans:", ccclans);
      return clans;
    }).catch((error) => {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
    });
  }