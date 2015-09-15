var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(request);

var parseBody = function(data){ return JSON.parse(data[0].body) };

var Consultas = function(){
}

var config = require("./config")
var remoteServer = config.DIRECCION_API

Consultas.all = function(){
  return this.get('consultas')
  .then(parseBody)
}

Consultas.responder = function(consulta, respuesta){
  var url = 'consultas/'+ consulta.id +'/respuestas';

  return this.post(url, respuesta)
  .then(parseBody);
}

Consultas.enviarConsulta = function (consulta) {
  return this.post("consultas", consulta);
}

Consultas.post = function(route, body) {
  var options = {
    headers: { 'content-type' : 'application/json' },
    url: remoteServer + '/' + route,
    body: JSON.stringify(body)
  };

  return request.postAsync(options);
}

Consultas.get = function(route){
  var options = {
    headers: { 'content-type' : 'application/json' },
    url: remoteServer + '/' + route
  };

  return request.getAsync(options);
}

Consultas.sePuedeResponder = function(consulta){
  var url = 'consultas/' + consulta.id + '/sePuedeResponder';
  return this.get(url).then(parseBody);
}

module.exports = Consultas;
