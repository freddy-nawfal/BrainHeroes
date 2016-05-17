$('#training').click(function(){
	window.location.replace("training.html");
});
$('#credits').click(function(){
	window.location.replace("credits.html");
});

var signes = ["&pi;","&Omega;","&Delta;","42","&prop;","3.14","1,61","0,23","2.71","8","7","193","1,41","1,73","6,02","1","2","3","4","5","6","8","9","8,31","6,28","9, 8","0,76","0,59"," &infin;","&micro;","&Sigma;","&forall;"," &exist;","&isin;"," &empty;","&notin;"];
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
	i++;
	var randomTaille = Math.floor((Math.random() * 35) + 15);
	var randomSign = Math.floor((Math.random() * signes.length-1) + 1);
	var randomColor = Math.floor((Math.random() * colours.length-1) + 1);
	RandomPosition(signes[randomSign],"nombre"+i, randomTaille, colours[randomColor]);
},200);
