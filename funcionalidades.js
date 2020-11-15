const api = new XMLHttpRequest ();

var url, datos, validadorDeConsulta, info_anterior;

var arrayBase = new Array();

$( document ).ready(function() {

$( "#vDocumento" ).click(function() { 
validarDocumento ();
$("#documento").focus(); });

$( "#vDocumentoSoU" ).click(function() { 
validarDocumento_docentesSoU ();
$("#documento").focus(); });

$("#documento").keypress(function(e) { 
var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13){ 
validarDocumento();
$("#documento").focus();
return false; } });

$("#documento").focus(); });

/*--------------------------------------------------------------------------------*/

function inicializarArray() { arrayBase = new Array(); }

/*--------------------------------------------------------------------------------*/

function validarDocumento () {
 inicializarArray();
 url = 'https://spreadsheets.google.com/feeds/list/1V515uN5iW1uBA20Urw3swLEPQEwjEkIb0neNMG6Il30/1/public/values?alt=json';
 api.open('GET',url,true);
 api.send();
 $("#resultados").html("¡Tu petición está siendo procesada!, <b>por favor espera…</b>");

 api.onreadystatechange = function () {
 if (this.status == 500) { sinResultados (); }
 else if (this.status == 200 && this.readyState == 4) {
  datos = JSON.parse (this.responseText); // Transformación a formato JSON.
  validadorDeConsulta = 0;
  if (datos.feed.openSearch$totalResults.$t != '0') {
  var i = datos.feed.entry.length - 1;
  while (i >= 0) {
  if (datos.feed.entry[i]["gsx$documento"].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   $("#resultados").html(
   '<div class="text-center color_primario Trnsp"><li class ="list-group-item shadow-sm"> <b>Nombre del participante: </b>' + datos.feed.entry[i]["gsx$nombrecompleto"].$t +
   ' (<b>Doc. <i class="text-danger">' + datos.feed.entry[i]["gsx$documento"].$t + "</b></i>)" +
   '<li class ="list-group-item shadow-sm text-center">' +
   '<a href=' + datos.feed.entry[i]["gsx$mergeddocurl-generadorprimero"].$t + ' target="_blank"><strong>Certificado de participación (PERSONAL), ¡clic aquí para descargar!</strong></a>' + '</li></div>');
   i = 0; cargarCentros(); 
  } i--; } } }
if (validadorDeConsulta == 0) { sinResultados (); } }
$("#documento").focus(); }

/*--------------------------------------------------------------------------------*/

function validarDocumento_docentesSoU () {
 inicializarArray();
 url = 'https://spreadsheets.google.com/feeds/list/183UjpRiEEtdVLRnDY_fFXn3I3grdd_otmtxs5i_nJok/1/public/values?alt=json';
 api.open('GET',url,true);
 api.send();
 $("#resultados").html("¡Tu petición está siendo procesada!, <b>por favor espera…</b>");

 api.onreadystatechange = function () {
 if (this.status == 500) { sinResultados (); }
 else if (this.status == 200 && this.readyState == 4) {
  datos = JSON.parse (this.responseText); // Transformación a formato JSON.
  validadorDeConsulta = 0;
  if (datos.feed.openSearch$totalResults.$t != '0') {
  var i = datos.feed.entry.length - 1;
  while (i >= 0) {
  if (datos.feed.entry[i]["gsx$documento"].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   $("#resultados").html(
   '<div class="text-center color_primario Trnsp"><li class ="list-group-item shadow-sm"> <b>Nombre del participante: </b>' + datos.feed.entry[i]["gsx$nombrecompleto"].$t +
   ' (<b>Doc. <i class="text-danger">' + datos.feed.entry[i]["gsx$documento"].$t + "</b></i>)" +
   '<li class ="list-group-item shadow-sm text-center">' +
   '<a href=' + datos.feed.entry[i]["gsx$mergeddocurl-generadorprimero"].$t + ' target="_blank"><strong>Certificado de participación (PERSONAL), ¡clic aquí para descargar!</strong></a>' + '</li></div>');
   i = 0; cargarCentros_docentesSoU(); 
  } i--; } } }
if (validadorDeConsulta == 0) { sinResultados (); } }
$("#documento").focus(); }

/*--------------------------------------------------------------------------------*/

function sinResultados () {
$("#resultados").html('¡Ups!, <b>¡no hay resultados para el documento ingresado!.</b>'); }

/*--------------------------------------------------------------------------------*/

function cargarCentros() {
 url = 'https://spreadsheets.google.com/feeds/list/1SFgPqowwtowFWPAay5itQdU-XU6Ru7G43U65-mr7BUg/1/public/values?alt=json';
 api.open('GET',url,true);
 api.send();

api.onreadystatechange = function () {
 info_anterior = $("#resultados").html();
 if (this.status == 500) { sinResultados_centros(); }
 else if (this.status == 200 && this.readyState == 4) { 
  datos = JSON.parse (this.responseText); 
  validadorDeConsulta = 0;
  if (datos.feed.openSearch$totalResults.$t != '0') {
  inicializarArray ();
  var i2 = datos.feed.entry.length - 1;
  while (i2 >= 0) { 
  if (datos.feed.entry[i2]["gsx$documento"].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   if ( arrayBase.indexOf(datos.feed.entry[i2]["gsx$centroeducativo"].$t + datos.feed.entry[i2]["gsx$centronumero"].$t)==-1) {
   arrayBase.push(datos.feed.entry[i2]["gsx$centroeducativo"].$t + datos.feed.entry[i2]["gsx$centronumero"].$t); 
   $("#resultados").html($("#resultados").html() + '<div class="text-center color_primario Trnsp">' +
   '<li class ="list-group-item shadow-sm">' + '<a href="' +
   datos.feed.entry[i2]["gsx$mergeddocurl-generadorprimero"].$t +
   '" target="_blank"><strong> Centro educativo: ' + 
   datos.feed.entry[i2]["gsx$centroeducativo"].$t + " N° " +
   datos.feed.entry[i2]["gsx$centronumero"].$t + " (" +
   datos.feed.entry[i2]["gsx$departamento"].$t + "), ¡clic aquí para descargar!" +
   '</a></strong></li></div>' );}
  } i2--;} }
  if (validadorDeConsulta == 0) { sinResultados_centros (); }
} } }

/*--------------------------------------------------------------------------------*/

function cargarCentros_docentesSoU() {
 url = 'https://spreadsheets.google.com/feeds/list/1YP0FWSSyMG6aHEAV6SDYlJDcqVwN7JeXIyyi71Hj6Ac/1/public/values?alt=json';
 api.open('GET',url,true);
 api.send();

api.onreadystatechange = function () {
 info_anterior = $("#resultados").html();
 if (this.status == 500) { sinResultados_centros(); }
 else if (this.status == 200 && this.readyState == 4) { 
  datos = JSON.parse (this.responseText); 
  validadorDeConsulta = 0;
  if (datos.feed.openSearch$totalResults.$t != '0') {
  inicializarArray ();
  var i2 = datos.feed.entry.length - 1;
  while (i2 >= 0) { 
  if (datos.feed.entry[i2]["gsx$documento"].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   if ( arrayBase.indexOf(datos.feed.entry[i2]["gsx$centroeducativo"].$t + datos.feed.entry[i2]["gsx$centronumero"].$t)==-1) {
   arrayBase.push(datos.feed.entry[i2]["gsx$centroeducativo"].$t + datos.feed.entry[i2]["gsx$centronumero"].$t); 
   $("#resultados").html($("#resultados").html() + '<div class="text-center color_primario Trnsp">' +
   '<li class ="list-group-item shadow-sm">' + '<a href="' +
   datos.feed.entry[i2]["gsx$mergeddocurl-generadorprimero"].$t +
   '" target="_blank"><strong> Centro educativo: ' + 
   datos.feed.entry[i2]["gsx$centroeducativo"].$t + " N° " +
   datos.feed.entry[i2]["gsx$centronumero"].$t + " (" +
   datos.feed.entry[i2]["gsx$departamento"].$t + "), ¡clic aquí para descargar!" +
   '</a></strong></li></div>' );}
  } i2--;} }
  if (validadorDeConsulta == 0) { sinResultados_centros (); }
} } }

/*--------------------------------------------------------------------------------*/

function sinResultados_centros () {
$("#resultados").html(info_anterior + '<div class="text-center color_primario Trnsp">' +
'<li class ="list-group-item shadow-sm"> <b>¡No hay centros asociados!</b></li></div>'); }