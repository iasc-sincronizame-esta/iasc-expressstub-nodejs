var express = require('express');
var app = express();

require("./consultasController")(app);
require("./consultasNotificador");

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/*
- Siempre hay que mandar el remitente. Cualquier podría hackearla y mandar mensajes como otro remitente pero eso no nos importa.
- Si alguien hace handshake como alumno y manda el evento "respondiendo", puede, y tampoco nos importa :).
- Lo que sí validamos es que solo los docentes escuchan el topic "respondiendo".
*/