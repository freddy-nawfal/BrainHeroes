var cHandlers = {
	connected : function(){
		printLoadingMsg(msg.multi.info.connected);
		setTimeout(function(){
			loaded();
		},0);
	},
	usersConnected : function(data){
		$('#users').html(data);
	},
	login : function(reason){
		alertify.prompt(reason, function (e, str) {
		    // str is the input text
		    if (e) {
		       socket.emit("login", str);
		    } else {
		       socket.emit("login", null);
		    }
		}, "Name");
		
	},
	notlogged : function(reason){
		alertify.error("You are not logged in !");
		this.login(reason);
	},
	disconnect : function(){
		alertify.confirm(msg.multi.info.disconnected, function (e) {
		    window.location.replace("index.html");
		});
	},
	gotNames : function(data){
		console.log(data);
		names = data;
	}
}
