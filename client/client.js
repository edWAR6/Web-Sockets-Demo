var ws = new WebSocket('ws://192.168.0.14:1234', 'echo-protocol');

function sendMessage(){
	var message = document.getElementById('message').value;
	ws.send(message);
}

ws.addEventListener('message', function(result){
	var msg = result.data;

	document.getElementById('chatlog').innerHTML += '<br>' + msg;
});
