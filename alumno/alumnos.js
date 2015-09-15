var _ = require("lodash");
var request = require('request');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

var ayudantesApi = {
	postConsulta : function (consulta, cb) {
		request.post({
			headers: { 'content-type' : 'application/json' },
			url: config.DIRECCION_API + '/consultas',
			body: JSON.stringify(consulta)
		}, cb);
	}
};

var remitentes = ["Aldana", "Rodri", "Ariel", "Charly", "Nahuel"];

var consultasFactory = {
	remitente : _.sample(remitentes),
	mensajes : [
		'¿A qué hora es la clase?',
		'¿En qué aula es?',
		'¿Había que hacer un TP para hoy?'
	],

	random : function() {
		return {
			remitente: this.remitente,
			mensaje: _.sample(this.mensajes)
		};
	}
};

function sendConsultaHttp() {
	var body = consultasFactory.random()

	var cb = function(err, response) {
		if (err) { return console.log(err); }

		console.log(response.statusCode);
		console.log("Consulta enviada: " + JSON.stringify(body));
	}

	ayudantesApi.postConsulta(body, cb);	
};


io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuesta", function(consulta) { console.log("Respondieron una consulta: " + JSON.stringify(consulta)) })


setInterval(sendConsultaHttp, 1000);