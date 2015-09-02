var _ = require("lodash");
var request = require('request');

var baseUrl = "http://192.168.3.67:3000/";

var ayudantesApi = {
	postConsulta : function (consulta, cb) {
		request.post({
			headers: { 'content-type' : 'application/json' },
			url: baseUrl + 'consultas',
			body: JSON.stringify(consulta)
		}, cb);
	}
};

var remitentes = ["Aldana", "Rodri", "Ariel", "Charly", "Nahuel"]
var mensajes = [
	'¿A qué hora es la clase?',
	'¿En qué aula es?',
	'¿Había que hacer un TP para hoy?'
]


function sendConsulta() {

	var body = {
		remitente: _.sample(remitentes),
		mensaje: _.sample(mensajes)
	};

	var cb = function(err, response) {
		if (err) { return console.log(err); }

		console.log(response.statusCode);
		console.log("Consulta creada: " + JSON.stringify(body));
	}

	ayudantesApi.postConsulta(body, cb);	
};

setInterval(sendConsulta, 700)