var Suscripcion = require("./suscripcion")
var listaDeMails = require('./listaDeMails')
var server = require('http').createServer();
var io = require('socket.io')(server);

/*
tópicos disponibles:
  - consultas
  - respuestas
  - respondiendo
*/
io.on('connection', function(socket) {
  console.log("Me llegó una conexión de ", socket.id);

  // Suscribe automáticamente a los tópicos de mensajes
  ["consultas", "respuestas"].forEach(function(topico) {
    listaDeMails.suscribir(new Suscripcion({
      suscriptor: socket,
      topico: topico
    }));
  });

  socket.on('suscribir', function(topico) {
    var suscripcion = new Suscripcion({
      suscriptor: socket,
      topico: topico
    });

    listaDeMails.suscribir(suscripcion);
  });

  socket.on('respondiendo', function(evento) {
    listaDeMails.enviarATopico("respondiendo", {
      consulta: listaDeMails.obtener(evento.consultaId),
      remitente: evento.remitente
    });
  });

  socket.on('disconnect', function() {
    console.log("Se me fue ", socket.id);
    listaDeMails.cancelarSuscripción(socket);
  });
});

server.listen(3001);
