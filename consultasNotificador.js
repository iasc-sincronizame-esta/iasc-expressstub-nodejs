var listaDeMails = require('./listaDeMails')
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("Me llegó una conexión de ", socket.id);

  socket.on('suscribir', function(topico) {
    listaDeMails.suscribir({
      suscriptor: socket,
      topico: topico
    });
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
