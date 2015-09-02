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

  socket.on('respondiendo', function(idConsulta) {
    listaDeMails.enviar
  });

  socket.on('disconnect', function() {
    console.log("Se me fue ", socket.id);
    listaDeMails.cancelarSuscripción(socket);
  });
});

server.listen(3001);
