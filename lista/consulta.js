_ = require('lodash')

function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000).toString();
  this.respuestas = [];
  _.assign(this, data);
}

Consulta.prototype.responder = function(respuesta, onSuccess, onError) {
  primerRespuesta = _.first(this.respuestas);

  if (primerRespuesta && respuesta.remitente != primerRespuesta.remitente)
  	onError("Solo puede responder el que ya respondió");
  else {
  	this.respuestas.push(respuesta);
  	onSuccess(this);
  }
};

module.exports = Consulta;
