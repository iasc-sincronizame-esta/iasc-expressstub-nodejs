_ = require('lodash')

function Suscripcion(data) {
  _.assign(this, data);
}

Suscripcion.prototype.enviar = function(mensaje) {
  this.suscriptor.socket.emit(this.topico, mensaje);
};

module.exports = Suscripcion;
