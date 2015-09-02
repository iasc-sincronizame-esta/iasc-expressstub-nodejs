_ = require('lodash')

function Suscripcion(data) {
  _.assign(this, data);
}

Suscripcion.prototype.enviar = function(mensaje) {
  this.suscriptor.emit(mensaje);
};

module.exports = Suscripcion;
