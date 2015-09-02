_ = require("lodash")

function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000).toString();
  this.respuestas = [];
  _.assign(this, data);
}

Consulta.prototype.responder = function(respuesta) {
  this.respuestas.push(respuesta);
};

module.exports = Consulta;
