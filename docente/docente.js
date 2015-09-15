var Consultas = require('../shared/consultas');
var request = require('request');
var _ = require('lodash');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

var docentes = [
  "tu vieja", "mapache", "rodri042docente", "jaimito", "lima_nueva", "laCajaDeCamello"
];

function responderConsultaRandom(){
  Consultas.all(function(consultas){
    if(!consultas){ return; }
    console.log("Enviando respuesta");
    var consulta = _.sample(consultas);
    var respuesta = {
      remitente: _.sample(docentes),
      mensaje: "Si si, dale para adelante con eso."
    };
    Consultas.responder(consulta, respuesta,
      function(data){console.log("respuesta ok"),
      function(err){ console.log(err)}});
  }, function(err){
    console.log(err);
  })
};

io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuestas", function(consulta) { console.log("Respondieron una consulta: " + JSON.stringify(consulta)) })


setInterval(responderConsultaRandom, 2000);
