function Consulta(data) {
  this.id = Math.floor(Math.random() * 1000000);
  this.respuestas = [];
}

Consulta.prototype.responder = function(respuesta) {
  this.respuestas.push(respuesta);
};

module.exports = Consulta;
