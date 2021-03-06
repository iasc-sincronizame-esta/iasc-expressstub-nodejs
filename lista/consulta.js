Promise = require("bluebird")
_ = require("lodash")

function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000).toString();
  this.respuestas = [];
  this.elQueEstaEscribiendo = null;

  _.assign(this, data);
}

Consulta.prototype.responder = function(respuesta) {
  var self = this;

  return new Promise(function(resolve, reject) {
    primerRespuesta = _.first(self.respuestas);

    //3era iteración
    if (primerRespuesta && respuesta.remitente != primerRespuesta.remitente)
      return reject("Solo puede responder el que ya respondió");
    
    self.respuestas.push(respuesta);
    self.seDejoDeResponder();
    resolve(self);
  });
};

Consulta.prototype.seEstaRespondiendo = function(remitente) {
  this.elQueEstaEscribiendo = remitente;
}

Consulta.prototype.seDejoDeResponder = function() {
  this.elQueEstaEscribiendo = null;
}

Consulta.prototype.sePuedeResponder = function(remitente) {
  return this.elQueEstaEscribiendo == null;
}

module.exports = Consulta;
