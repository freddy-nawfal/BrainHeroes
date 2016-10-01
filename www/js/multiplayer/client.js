function loading(){
	$('#menu').hide();
	$('#loading').show();
	$('#loadingInfo').html('Connecting to the server ... <br>');
}
function loaded(){
	$('#menu').show();
	$('#loading').hide();
}
function printLoadingMsg(msg){
	$('#loadingInfo').append(msg+"<br>");
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
		loading();
		printLoadingMsg("There was an error connecting");
	},
	connect_timeout : function(){
		loading();
		printLoadingMsg("Connection Timeout");
	},
	reconnect_attempt : function(data){
		loading();
		printLoadingMsg("Trying to reconnect <i>("+data+")</i>");
	},
	reconnect_error : function(){
		loading();
		printLoadingMsg("There was an error reconnecting");
	},
	reconnect_failed : function(){
		loading();
		printLoadingMsg("Reconnection failed");
	}
}


function connectionHandlers(){
	socket.on('connected', cHandlers.connected);
	socket.on('usersConnected', cHandlers.usersConnected);
}

var cHandlers = {
	connected : function(){
		printLoadingMsg("CONNECTED TO SERVER");
		setTimeout(function(){
			loaded();
		},3000);
	},
	usersConnected : function(data){
		$('#users').html(data);
	}
}

loading();

var socket = io('http://192.168.1.17:3000');

errorsHandler();
connectionHandlers();