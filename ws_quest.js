// ------------- Dispara los resultados de las quests ------------- //
// ------------- Muestra el resultado en la parte superior ------------- //
$(".tabs").parent().after(document.getElementById("sumario"));
if(document.getElementById("vertodasquest") != null){
    document.getElementById("vertodasquest").click();
}
else {
    document.getElementById("final0").click();}

//GLOBAL.cargaImperio();
