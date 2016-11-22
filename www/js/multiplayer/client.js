var names = [];
var last;

function loading(){
	$('#menu').hide();
	$('#loading').show();
	$('#loadingInfo').html(msg.multi.info.connecting +' <br>');
}
function loaded(){
	$('#menu').show();
	$('#loading').hide();
	$('#1v1').off('click');
	$('#1v1').click(function(){
		last=Date.now();
		socket.emit("click");
	});
	$('#disconnect').off('click');
	$('#disconnect').click(function(){
		socket.disconnect();
	});
}
function printLoadingMsg(msg){
	$('#loadingInfo').append(msg+"<br>");
}
function printSuccessTooltip(msg){
	alertify.success(msg);
}


function errorsHandler(){
	socket.on('connect_error', errors.connect_error);
	socket.on('connect_timeout', errors.connect_timeout);
	socket.on('reconnect_attempt', errors.reconnect_attempt);
	socket.on('reconnect_error', errors.reconnect_error);
	socket.on('reconnect_failed', errors.reconnect_failed);

}

function connectionHandlers(){
	socket.on('connected', cHandlers.connected);
	socket.on('usersConnected', cHandlers.usersConnected);
	socket.on('login', cHandlers.login);
	socket.on('notlogged', cHandlers.notlogged);
	socket.on('disconnect', cHandlers.disconnect);
	socket.on('usersNames', cHandlers.gotNames)
}
function otherHandlers(){
	socket.on('clickiti', oHandlers.clickiti);
}



loading();



var socket = io('http://192.168.1.17:3000');

errorsHandler();
connectionHandlers();
otherHandlers();

