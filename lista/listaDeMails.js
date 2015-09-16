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

ListaDeMails.prototype.cancelarSuscripcionesDe = function(nombre) {
  _.remove(this.suscripciones, { "suscriptor.nombre": nombre });
}

ListaDeMails.prototype.enviarATopico = function(topico, mensaje, filtro) {
  if (!filtro) filtro = function() { return true; };

  _(this.suscripciones)
    .filter({ topico: topico })
    .filter(function(suscripcion) {
      return filtro(suscripcion.suscriptor);
    }).forEach(function(suscripcion) {
      suscripcion.enviar(mensaje);
    });
}

ListaDeMails.prototype.yaEstaRespondiendo = function(remitente) {
  return this.consultas
    .some(function(consulta) {
      return consulta.elQueEstaEscribiendo == remitente;
    });
}

module.exports = new ListaDeMails();
