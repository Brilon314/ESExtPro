function imprimirDatos {
  const formaciones2 = localStorage.getItem('Imperio');
  console.log('formaciones2:', formaciones2);
  var dataJSON = formaciones2; // Aquí se colocaría todo el JSON
  console.log('dataJSON:', dataJSON);
  var objeto = JSON.parse(dataJSON);
  console.log('objeto:', objeto);
  var nombre = objeto.nombre;
  console.log('nombre:', nombre);
  var clan = objeto.clan;
  console.log('clan:', clan);
}
document.getElementById('exportar').addEventListener('click', function() {
  const formaciones = localStorage.getItem('Formaciones');
  if (formaciones) {
    imprimirDatos();
    descargarDatos('formaciones.json', formaciones);
  } else {
    alert('No hay formaciones guardadas para exportar.');
  }
});

function descargarDatos(nombreArchivo, contenido) {
  console.log('contenido:', contenido);
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