var ConsultasApi = require('../shared/consultas');
var request = require('request');
var _ = require('lodash');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

function Docente(nombre){
  this.nombre = nombre;
  this.consulta = null;
  this.respuestaTimeout = null;
}

Docente.prototype.mandarRespuesta = function(timeout){
  var self = this;
  var timeout = timeout || 2000;
  console.log("Escribiendo respuesta para " + JSON.stringify(self.consulta));
  io.emit("respondiendo", { consultaId: self.consulta.id, remitente: self.nombre });
  self.respuestaTimeout = setTimeout(function() {
    var respuesta = {
      remitente: self.nombre,
      mensaje: "Si si, dale para adelante con eso."
    };
    ConsultasApi.responder(self.consulta, respuesta)
    .then( function(res){ console.log("Respuesta enviada: " + JSON.stringify(res) ) })
    .catch( function(err){ console.log("ERROR: " + err) });
  }, timeout);
}

Docente.prototype.responderConsultaRandom = function(){
  var self = this;
  ConsultasApi.all()
  .then(function(consultas){
    if(_.isEmpty(consultas)){
      return console.log("No hay consultas");
    }
    self.consulta = _.sample(consultas);
    ConsultasApi.sePuedeResponder(self.consulta)
    .then(function(sePuedeResponder){
      console.log(sePuedeResponder);
      if (!sePuedeResponder) { self.mandarRespuesta(2000) }
    })
  });
}

Docente.prototype.cancelarRespuesta = function(consulta){
  clearTimeout(this.respuestaTimeout);
  io.emit("norespondomas");
  this.mandarRespuesta(_.sample([2000, 5000, 7000]));
}

Docente.prototype.estoyRespondiendoLaMisma = function(consulta){
  return consulta.id == this.consulta.id;
}

module.exports = Docente;
