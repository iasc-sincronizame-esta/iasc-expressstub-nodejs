//==========
//===EH LEE LA DOCUMENTACIÓN ACA=====
//==http://expressjs.com/guide/routing.html===
//==Para más detalles de la API MIRA ACA===
//==http://expressjs.com/4x/api.html
var request = require('request');
var _ = require('lodash');
var hostIp = "http://192.168.3.67";
var baseUrl = hostIp + ":3000";

var docentes = [
  "tu vieja", "mapache", "rodri042docente", "jaimito", "lima_nueva", "laCajaDeCamello"
];

function getToServer(){
  request.get('http://192.168.3.67:3000/consultas', function (err, response) {
  	if (err) {
  		console.error(err);
  		return;
  	};

  	//console.log("        GET: " + JSON.stringify(response));


    var consultas = JSON.parse(response.body);
    var consulta = _.sample(consultas);
    var respuesta = {
      remitente: _.sample(docentes),
      mensaje: "Si si, dale para adelante con eso."
    };

    var options = {
      url: baseUrl+'/consultas/'+consulta.id+'/respuestas',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(respuesta)
    };

    request.post(options,function (err, response) {
    	if (err) {
    		console.error(err);
    		return;
    	};

      //console.log("        POST: " + JSON.stringify(response));
    });
  })
};

//setInterval(getToServer, 1000);


var io = require('socket.io-client')(hostIp + ":3001");

setInterval(function(){
  io.emit("suscribir", {"tuVieja": "bool"});
}, 1000)

io.on("hola",function(response){
  console.log("Rodri dice ",response);
})
