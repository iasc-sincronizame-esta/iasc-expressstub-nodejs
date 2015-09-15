var _ = require("lodash");
var request = require('request');
var config = require("../shared/config")
var io = require('socket.io-client')(config.DIRECCION_NOTIFICACIONES);
var ConsultasApi = require('../shared/consultas');

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
	var consulta = consultasFactory.random()

	ConsultasApi.enviarConsulta(consulta)
	.then(function(data){ console.log("Consulta enviada: " + JSON.stringify(consulta)) })
	.catch(function(err){ console.log("ERROR: " + JSON.stringify(err)) });
};

// Escucho
io.on("consultas", function(consulta) { console.log("Nueva consulta: " + JSON.stringify(consulta)) })

io.on("respuestas", function(consulta) { console.log("Respondieron una consulta: " + JSON.stringify(consulta)) })


setInterval(sendConsultaHttp, 2000);
