Promise = require("bluebird")
_ = require("lodash")

function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000).toString();
  this.respuestas = [];
  this._respondedor = null;

  _.assign(this, data);
}

Consulta.prototype.responder = function(respuesta) {
  return new Promise(function(resolve, reject) {
    primerRespuesta = _.first(this.respuestas);

    if (primerRespuesta && respuesta.remitente != primerRespuesta.remitente)
      return reject("Solo puede responder el que ya respondió");
    
    this.respuestas.push(respuesta);
    resolve(this);
  });
};

Consulta.prototype.seEstaRespondiendo = function(remitente) {
  this._respondedor = remitente;
}

Consulta.prototype.seDejoDeResponder = function() {
  this._respondedor = null;
}

Consulta.prototype.sePuedeResponder = function(remitente) {
  return this._respondedor != null;
}

module.exports = Consulta;
