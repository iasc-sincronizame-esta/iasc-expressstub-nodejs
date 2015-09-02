//==========
//===EH LEE LA DOCUMENTACIÓN ACA=====
//==http://expressjs.com/guide/routing.html===
//==Para más detalles de la API MIRA ACA===
//==http://expressjs.com/4x/api.html
var request = require('request');
var _ = require('lodash');

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
      url:'http://192.168.3.67:3000/consultas/'+consulta.id+'/respuestas',
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

setInterval(getToServer, 1000);
