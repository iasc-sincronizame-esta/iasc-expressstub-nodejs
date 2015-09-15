var _ = require('lodash');

var ListaDeMails = function() {
  this.consultas = [];
  this.suscripciones = [];
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

ListaDeMails.prototype.suscribir = function(suscripcion) {
  return this.suscripciones.push(suscripcion);
}

ListaDeMails.prototype.cancelarSuscripción = function(suscriptor) {
  _.remove(this.suscripciones, { suscriptor: suscriptor });
}

ListaDeMails.prototype.enviarATopico = function(topico, mensaje) {
    _
      .filter(this.suscripciones, { topico: topico })
      .forEach(function(suscripcion) {
        suscripcion.enviar(mensaje);
      }.bind(this));
}

module.exports = new ListaDeMails();
