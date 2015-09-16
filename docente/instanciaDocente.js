var _ = require('lodash');
var config = require("../shared/config");
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);
var Docente = require("./docente");

var docentes = [
  "tu vieja", "mapache", "rodri042docente", "jaimito", "lima_nueva", "laCajaDeCamello"
];

var instanciaDocente = new Docente(_.sample(docentes));
//Escucho
io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuestas", function(respuesta) { console.log("Respondieron una consulta: " + JSON.stringify(respuesta)) })

io.on("respondiendo", function(response) {
  console.log("Estan respondiendo: " + JSON.stringify(response));
  if(instanciaDocente.estoyRespondiendoLaMisma(response.consulta)){
    console.log("Estan respondiendo la misma! Cancelo.");
    instanciaDocente.cancelarRespuesta(response.consulta);
  }
})

//Suscribo
console.log("Soy " + instanciaDocente.nombre);
io.emit("suscribir", "respondiendo");
io.emit("ehwachin", { nombre: instanciaDocente.nombre, tipo:"docente" })

setInterval(instanciaDocente.responderConsultaRandom.bind(instanciaDocente), 5000);
