function loading(){
	$('#menu').hide();
	$('#loadingInfo').append('Connecting to the server ... <br>');
}
function loaded(){
	$('#menu').show();
}
function printLoadingMsg(msg){
	$('#loadingInfo').html(msg+"<br>");
}


function errorsHandler(){
	socket.on('connect_error', errors.connect_error);
	socket.on('connect_timeout', errors.connect_timeout);
	socket.on('reconnect_attempt', errors.reconnect_attempt);
	socket.on('reconnect_error', errors.reconnect_error);
	socket.on('reconnect_failed', errors.reconnect_failed);
}


var errors = {
	connect_error : function(){
		printLoadingMsg("There was an error connecting");
	},
	connect_timeout : function(){
		printLoadingMsg("Connection Timeout");
	},
	reconnect_attempt : function(data){
		printLoadingMsg("Trying to reconnect <i>("+data+")</i>");
	},
	reconnect_error : function(){
		printLoadingMsg("There was an error reconnecting");
	},
	reconnect_failed : function(){
		printLoadingMsg("Reconnection failed");
	}
}


loading();

var socket = io('http://localhost:3000');

errorsHandler();