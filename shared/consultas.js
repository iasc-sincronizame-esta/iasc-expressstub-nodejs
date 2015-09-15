var request = require('request');

var Consultas = function(){
}

var remoteServer = "192.168.3.67";
var localhost = "0.0.0.0";

Consultas.all = function(onSuccess, onError){
  request.get('http://' + remoteServer + ':3000/consultas', function(err, response){
    if (err) {
      onError(err);
    }else{
      onSuccess(JSON.parse(response.body));
    };
  })
}

Consultas.responder = function(consulta, respuesta, onSuccess, onError){
  var options = {
    url:'http://' + remoteServer + ':3000/consultas/'+consulta.id+'/respuestas',
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