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
  console.log("Me llegó una conexión de ", socket.id);

  // Handshake (el suscriptor tiene: socket, nombre y tipo)
  socket.on('ehwachin', function(suscriptor) {
    _.assign(suscriptor, { socket: socket });

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
      console.log(evento.remitente + " está respondiendo la consulta " + evento.consultaId);

      if (listaDeMails.yaEstaRespondiendo(evento.remitente))
        return console.log("... pero ya está respondiendo otra: lo ignoramos");

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
