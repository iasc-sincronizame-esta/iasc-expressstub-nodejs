var Consulta = require("./consulta")

module.exports = function(app) {

  var consultas = []

  // POST /consultas { remitente: 'Nahue', mensaje: 'asd' }
  app.post('consultas', function(req, res) {
    consultas.push(new Consulta(req.body));
    res.send(200);
  });

  // GET /consultas
  app.get('consultas', function(req, res) {
      res.json(consultas);
  });


  // POST /consultas/id/respuestas { remitente: 'Nahue', mensaje: 'asd' }
  app.post('consultas/:id/respuestas', function(req, res) {
    idRespuesta = req.params.id

    respuesta = _.find(consultas, { id: idRespuesta });

    if (respuesta) res.json(respuesta);
    else res.send(404);
  });

}
