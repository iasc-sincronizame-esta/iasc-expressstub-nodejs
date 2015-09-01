_ = require("lodash")

function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000);
  this.respuestas = [];

  console.log(data);
  _.assign(this, data);
}

Consulta.prototype.responder = function(respuesta) {
  this.respuestas.push(respuesta);
};

module.exports = Consulta;
