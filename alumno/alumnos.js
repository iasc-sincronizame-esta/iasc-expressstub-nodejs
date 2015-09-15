var baseUrl = "http://192.168.3.67",
	httpPort = "3000",
	socketPort = "3001";

var _ = require("lodash");
var request = require('request');
var config = require("../shared/config")
var baseUrl = "http://" + config.DIRECCION_API + "/";
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);

var ayudantesApi = {
	postConsulta : function (consulta, cb) {
		request.post({
			headers: { 'content-type' : 'application/json' },
			url: baseUrl + ':' + httpPort + '/' + 'consultas',
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


io.on("consulta", function(consulta) { console.log("Nueva consulta: " + consulta) })

io.on("respuesta", function(consulta) { console.log("Respondieron una consulta: " + consulta) })


setInterval(sendConsultaHttp, 1000);
