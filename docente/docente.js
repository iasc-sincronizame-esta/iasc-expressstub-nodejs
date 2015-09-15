var ConsultasApi = require('../shared/consultas');
var request = require('request');
var _ = require('lodash');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

var docentes = [
  "tu vieja", "mapache", "rodri042docente", "jaimito", "lima_nueva", "laCajaDeCamello"
];

function responderConsultaRandom(){
  var consulta, docente;
  ConsultasApi.all(function(consultas){
    console.log(consultas);
    if(_.isEmpty(consultas)){ 
      return console.log("No hay consultas :(");
     }
    consulta = _.sample(consultas);
    docente = _.sample(docentes),
    console.log("Escribiendo respuesta");
    io.emit("respondiendo", { consultaId: consulta.id, remitente: docente });
    setTimeout(function() {
      var respuesta = {
        remitente: docente,
        mensaje: "Si si, dale para adelante con eso."
      };
      ConsultasApi.responder(consulta, respuesta,
        function(data){ console.log("Respuesta enviada:" + JSON.stringify(data.body)) },
        function(err){ console.log("ERROR"); console.log(err) });
    }, 2000);
  }, function(err){
    console.log(err);
  })
};

//Escucho
io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuestas", function(respuesta) { console.log("Respondieron una consulta: " + JSON.stringify(respuesta)) })

io.on("respondiendo", function(consulta) { console.log("Estan respondiendo: " + JSON.stringify(consulta)) })

//Suscribo
io.emit("suscribir", "respondiendo");


setTimeout(responderConsultaRandom, 2000);
setTimeout(responderConsultaRandom, 4000);
