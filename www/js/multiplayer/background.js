var colours = ["white"];
var i = 0;

function RandomPosition(nombre,nom,randomTaille,randomColor){
	var menuWidth = $('#menu').width();
	var menuHeight = $('#menu').height();
	var positionX = Math.floor((Math.random() * menuWidth) + 1);
	var positionY = Math.floor((Math.random() * menuHeight) + 1);
	$('#tamere').append("<span id="+nom+" class='nbr'>"+nombre+"</span>");
	$('#'+nom).css({"color":randomColor,"position":"relative","left":positionX+"px","top":positionY+"px","font-size":randomTaille+"px","text-shadow":"2px 2px #666"});
	setTimeout(function(){
		$('#'+nom).toggle({effect:"scale",percent:200});
	},250);
	
}
setInterval(function(){
	if(names[0]){
		i++;
		var randomTaille = Math.floor((Math.random() * 35) + 15);
		var randomSign = Math.floor((Math.random() * names.length-1) + 1);
		var randomColor = Math.floor((Math.random() * colours.length-1) + 1);
		RandomPosition(names[randomSign],"nombre"+i, randomTaille, colours[randomColor]);
	}
	
},300);