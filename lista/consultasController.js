var Consulta = require('./consulta');
var listaDeMails = require('./listaDeMails')
var bodyParser = require('body-parser');
var morgan = require("morgan");

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(morgan("dev", {}));

  obtenerConsulta = function(req, res, next) {
    idConsulta = req.params.id

    consulta = listaDeMails.obtener(idConsulta);
    if (!consulta) return res.sendStatus(404);

    req.consulta = consulta;
    next()
  }

  // -----
  // Rutas
  // -----

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

  // GET /consultas/id/sePuedeResponder { sePuede: true }
  app.get('/consultas/:id/sePuedeResponder', obtenerConsulta, function(req, res) {
    res.json({ sePuede: req.consulta.sePuedeResponder() });
  });

  // POST /consultas/id/respuestas { remitente: 'Nahue', mensaje: 'asd' }
  app.post('/consultas/:id/respuestas', obtenerConsulta, function(req, res) {
    onSuccess = function(respuesta) {
      res.json(respuesta);
      listaDeMails.enviarATopico("respuestas", respuesta);
    }

    onError = function(err) {
      console.log(req.body.remitente + " trató de responder a " + req.consulta.id + " pero otro ya la respondió antes");
      res.status(400).json(err);
    }

    req.consulta
      .responder(req.body)
      .then(onSuccess)
      .catch(onError);
  });

}
