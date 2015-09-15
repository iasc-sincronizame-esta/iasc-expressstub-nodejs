var request = require('request');

var Consultas = function(){
}

var config = require("./config")
var remoteServer = config.DIRECCION_API

Consultas.all = function(onSuccess, onError){
  request.get( remoteServer + '/consultas', function(err, response){
    if (err) {
      onError(err);
    }else{
      onSuccess(JSON.parse(response.body));
    };
  })
}

Consultas.responder = function(consulta, respuesta, onSuccess, onError){
  var options = {
    url: remoteServer + '/consultas/'+consulta.id+'/respuestas',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify(respuesta)
  };

  request.post(options, function(err, response){
    if(err){
      onError(err);
    }else{
      onSuccess(response);
    }
  });
}

module.exports = Consultas;