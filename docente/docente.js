var Consultas = require('../shared/consultas');
var request = require('request');
var _ = require('lodash');

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

setInterval(responderConsultaRandom, 1000);
