var Consulta = require('./consulta');
var listaDeMails = require('./listaDeMails')
var bodyParser = require('body-parser');
var morgan = require("morgan");

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(morgan("dev", {}));

  // POST /consultas { remitente: 'Nahue', mensaje: 'asd' }
  app.post('/consultas', function(req, res) {
    var consulta = new Consulta(req.body)
    listaDeMails.guardar(consulta);
    res.sendStatus(200);

    listaDeMails.enviarATopico("consultas", consulta);
  });

  // GET /consultas
  app.get('/consultas', function(req, res) {
      res.json(listaDeMails.obtenerTodas());
  });

  // POST /consultas/id/respuestas { remitente: 'Nahue', mensaje: 'asd' }
  app.post('/consultas/:id/respuestas', function(req, res) {
    idConsulta = req.params.id

    consulta = listaDeMails.obtener(idConsulta);
    if (!consulta) return res.sendStatus(404);

    onSuccess = function(consulta) {
      res.json(consulta);
      listaDeMails.enviarATopico("respuestas", consulta);
    }

    consulta.responder(req.body, onSuccess, res.status(400).end);
  });

}
