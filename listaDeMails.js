var _ = require("lodash");

var ListaDeMails = function() {
  this.consultas = [];
  this.subscripcionesConsultas = [];
  this.subscripcionesArrancoAEscribir = [];
}

ListaDeMails.prototype.obtener = function(id) {
  return _.find(this.consultas, { id: id });
}

ListaDeMails.prototype.obtenerTodas = function() {
  return this.consultas;
}

ListaDeMails.prototype.guardar = function(consulta) {
  this.consultas.push(consulta);
}

module.exports = new ListaDeMails();
