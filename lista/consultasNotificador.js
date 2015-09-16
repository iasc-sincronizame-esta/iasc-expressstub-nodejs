var Suscripcion = require("./suscripcion")
var listaDeMails = require('./listaDeMails')
var server = require('http').createServer();
var io = require('socket.io')(server);
_ = require("lodash")

/*
tópicos disponibles:
  - consultas
  - respuestas
  - respondiendo
*/
io.on('connection', function(socket) {
  // Handshake (el suscriptor tiene: socket, nombre y tipo)
  socket.on('ehwachin', function(suscriptor) {
    _.assign(suscriptor, { socket: socket });
    console.log("Llegó ", suscriptor.nombre + " y me dijo: EH AMIGO!");

    topicsASuscribir = ["consultas", "respuestas"]
    if (suscriptor.tipo == "docente")
      topicsASuscribir.push("respondiendo");

    // Suscribe a los tópicos correspondientes
    topicsASuscribir.forEach(function(topico) {
      listaDeMails.suscribir(new Suscripcion({
        suscriptor: suscriptor,
        topico: topico
      }));
    });

    // Notificación de cuando un docente responde
    socket.on('respondiendo', function(evento) {
      var consulta = listaDeMails.obtener(evento.consultaId);
      if (consulta.seEstaRespondiendo()) //5ta iteración
        return console.log(evento.remitente + " quizo escribir en la consulta " + evento.consultaId + " pero no pudo (ya otro lo está haciendo)");

      if (listaDeMails.yaEstaRespondiendo(evento.remitente)) //6ta iteración
        return console.log(evento.remitente + " quizo escribir en la consulta " + evento.consultaId + " pero no pudo (ya está respondiendo otra)");

      console.log(evento.remitente + " está escribiendo en la consulta " + evento.consultaId);
      consulta.seEstaRespondiendo(evento.remitente);
      listaDeMails.enviarATopico("respondiendo", {
        consulta: listaDeMails.obtener(evento.consultaId),
        remitente: evento.remitente
      });
    });

    socket.on('disconnect', function() {
      console.log("Se me fue ", suscriptor.nombre);
      listaDeMails.cancelarSuscripcionesDe(suscriptor.nombre);
    });
  });
});

server.listen(3001);
