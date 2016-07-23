// NodeJS server
var http = require('http');
var server = http.createServer(function(){	
});

server.listen(1234, function(){
	console.log('Server is runing on port 1234.');
});

//Web Sockets server
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
	httpServer: server
});

var count = 0;
var clients = {};

wsServer.on('request', function(req){
	// Accepting connection
	var connection = req.accept('echo-protocol', req.origin);
	var id = count ++;
	clients[id] = connection;
	console.log('New connection accepted: '+ id);

	// Receiving message
	connection.on('message', function(message){
		var msString = message.utf8Data;
		// Broadcasting
		for(var client in clients){
			clients[client].sendUTF(msString);
		}
	});

	// Client exit
	connection.on('close', function(reasonCode, description){
		delete client[id];
		console.log('Client disconnected. Id: '+ id +', Address: '+ connection.remoteAddress);
	});
});

