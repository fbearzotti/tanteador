// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

var currentRow;
// Populate the database
//
function creoDB(tx) {
  //tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');

  //Tablas de TANTEADOR
  tx.executeSql('CREATE TABLE IF NOT EXISTS PARTIDOS (id INTEGER PRIMARY KEY AUTOINCREMENT,local,visitante,fecha,lugar,resultado,tiempo)');
  tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTOSPARTIDO (id INTEGER PRIMARY KEY AUTOINCREMENT,idpartido,evento,tiempo)');
  tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTOSTIPO (id INTEGER PRIMARY KEY AUTOINCREMENT,deno,puntos)');
}

// Query the database
//
function queryDB(tx) {
  tx.executeSql('SELECT * FROM PARTIDOS', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
  tx.executeSql("SELECT * FROM PARTIDOS where id = " + document.getElementById("id").value ,
          [], querySuccess, errorCB);
}
// Query the success callback
//
function querySuccess(tx, results) {
  var tblText = "<table data-role='table' id='table-CUSTOM-2' data-mode='column' class='ui-body-d ui-shadow table-stripe ui-responsive'>";
  tblText += "<thead><tr class='ui-bar-d'><th>Id</th><th>Local</th><th>Visitante</th><th>Resultado</th></tr></thead><tbody>"
  var len = results.rows.length;
  for (var i = 0; i < len; i++) {
    var tmpArgs = results.rows.item(i).id + ",'" + results.rows.item(i).name
            + "','" + results.rows.item(i).number + "'";
    tblText += "<tr><th>" + results.rows.item(i).id + "</th><td>" + results.rows.item(i).local + "</td><td>" + results.rows.item(i).visitante + "</td><td>" + results.rows.item(i).resultado + "</td></tr>";
  }
  tblText += "<tbody></table>";
  document.getElementById("tblDiv").innerHTML = tblText;
}

//Delete query
function deleteRow(tx) {
  tx.executeSql('DELETE FROM DEMO WHERE id = ' + currentRow, [], queryDB, errorCB);
}

// Transaction error callback
//
function errorCB(err) {
  alert("Error processing SQL: " + err.code);
}

// Transaction success callback
//
function successCB() {
  var db = window.openDatabase("Database", "1.0", "Tanteador", 200000);
  db.transaction(queryDB, errorCB);
}

// Cordova is ready
//
function onDeviceReady() {
  var db = window.openDatabase("Database", "1.0", "Tanteador", 200000);
  db.transaction(creoDB, errorCB, successCB);
  document.getElementById('qrpopup').style.display = 'none';
}

//Insert query
//
function insertPartidoDB(tx) {
  //tx.executeSql('INSERT INTO DEMO (name,number) VALUES ("' + document.getElementById("txtName").value
  //        + '","' + document.getElementById("txtNumber").value + '")');
  tx.executeSql('INSERT INTO PARTIDOS (local,visitante,fecha,lugar,resultado,tiempo) VALUES ("'
          + document.getElementById("local").value
          + '","' + document.getElementById("visitante").value
          + '","' + document.getElementById("fecha").value
          + '","' + document.getElementById("lugar").value
          + '","' + document.getElementById("resultado").value
          + '","' + document.getElementById("tiempo").value
          + '")');
  document.getElementById('qrpopup').style.display = 'none';
  document.getElementById("listapartidos").style.display = "block";
}

function goInsertPartido() {
  var db = window.openDatabase("Database", "1.0", "Tanteador", 200000);
  db.transaction(insertPartidoDB, errorCB, successCB);
}

function goSearch() {
  var db = window.openDatabase("Database", "1.0", "Tanteador", 200000);
  db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
  var db = window.openDatabase("Database", "1.0", "Tanteador", 200000);
  db.transaction(deleteRow, errorCB);
  document.getElementById('qrpopup').style.display = 'none';
}

//Show the popup after tapping a row in table
//
function goPopup(row, rowname, rownum) {
  currentRow = row;
  document.getElementById("qrpopup").style.display = "block";
  document.getElementById("editNameBox").value = rowname;
  document.getElementById("editNumberBox").value = rownum;
}

function editRow(tx) {
  tx.executeSql('UPDATE DEMO SET name ="' + document.getElementById("editNameBox").value +
          '", number= "' + document.getElementById("editNumberBox").value + '" WHERE id = '
          + currentRow, [], queryDB, errorCB);
}
function goEdit() {
  var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
  db.transaction(editRow, errorCB);
  document.getElementById('qrpopup').style.display = 'none';
}

//mis funciones
function abroNuevo() {
  document.getElementById("qrpopup").style.display = "block";
  document.getElementById("listapartidos").style.display = "none";
}
