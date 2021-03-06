var ConsultasApi = require('../shared/consultas');
var request = require('request');
var _ = require('lodash');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

var docentes = [
  "tu vieja", "mapache", "rodri042docente", "jaimito", "lima_nueva", "laCajaDeCamello"
];

var mandarRespuesta = function(consulta, nombre){
  console.log("Escribiendo respuesta para " + JSON.stringify(consulta));
  io.emit("respondiendo", { consultaId: consulta.id, remitente: nombre });
  setTimeout(function() {
    var respuesta = {
      remitente: nombre,
      mensaje: "Si si, dale para adelante con eso."
    };
    ConsultasApi.responder(consulta, respuesta)
    .then( function(res){ console.log("Respuesta enviada: " + JSON.stringify(res) ) })
    .catch( function(err){ console.log("ERROR: " + err) });
  }, 2000);
}

var nuevoDocente = function(nombre){
  return {
    nombre: nombre,
    responderConsultaRandom: function(){
      var consulta;
      ConsultasApi.all()
      .then(function(consultas){
        if(_.isEmpty(consultas)){
          return console.log("No hay consultas");
        }
        consulta = _.sample(consultas);
        ConsultasApi.sePuedeResponder(consulta)
        .then(function(sePuedeResponder){
          console.log(sePuedeResponder);
          if (sePuedeResponder) { mandarRespuesta(consulta, nombre) }
        })
      });
    }
  };
}

var instanciaDocente = nuevoDocente(_.sample(docentes));

//Escucho
io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuestas", function(respuesta) { console.log("Respondieron una consulta: " + JSON.stringify(respuesta)) })

io.on("respondiendo", function(consulta) { console.log("Estan respondiendo: " + JSON.stringify(consulta)) })

//Suscribo
console.log("Soy " + instanciaDocente.nombre);
io.emit("ehwachin", { nombre: instanciaDocente.nombre, tipo:"docente" })

setTimeout(instanciaDocente.responderConsultaRandom, 2000);
setTimeout(instanciaDocente.responderConsultaRandom, 4000);
