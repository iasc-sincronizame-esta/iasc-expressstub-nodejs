var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(request);

var Consultas = function(){
}

var config = require("./config")
var remoteServer = config.DIRECCION_API

Consultas.all = function(){
  return request.getAsync( remoteServer + '/consultas')
  .then(function(data){ return JSON.parse(data[0].body) })
}

Consultas.responder = function(consulta, respuesta){
  var options = {
    url: remoteServer + '/consultas/'+ consulta.id +'/respuestas',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(respuesta)
  };

  return request.postAsync(options)
  .then(function(data){ return JSON.parse(data[0].body) });
}

module.exports = Consultas;
