var errors = {
	connect_error : function(){
		loading();
		printLoadingMsg(msg.multi.errors.connect_error);
	},
	connect_timeout : function(){
		loading();
		printLoadingMsg(msg.multi.errors.connect_timeout);
	},
	reconnect_attempt : function(data){
		loading();
		printLoadingMsg(msg.multi.errors.reconnect_attempt+" <i>("+data+")</i>");
	},
	reconnect_error : function(){
		loading();
		printLoadingMsg(msg.multi.errors.reconnect_error);
	},
	reconnect_failed : function(){
		loading();
		printLoadingMsg(msg.multi.errors.reconnect_failed);
	}
}