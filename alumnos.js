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

var body = {
	remitente: 'Charly',
	mensaje: '¿A qué hora es la clase?'
};

function sendConsulta() {
	ayudantesApi.postConsulta(body, 
		function(err, response){
			if (err) { return console.log(error); }

			console.log("Consulta creada: " + JSON.stringify(body));
		});	
};

setInterval(sendConsulta, 1000)