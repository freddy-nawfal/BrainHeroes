
// objet contenant un nombre a et un nombre b ainsi que la réponse du calcul
	var calcul ={
		a :0,
		b :0,
		reponse:{},
		startTime : new Date(),
		palier : 25
	};
// objet contenant la difficulte lié au niveau du joueur, le nombre de calcul faux réalisé, le nombre de calcul juste, le nombre de calcul effectué et le ratio du joueur
	var personne = {
		difficulty : 0,
		totalDifficulty : 0,
		nb_faux : 0,
		nb_juste : 0,
		justes_affilee : 0,
		faux_affilee : 0,
		totalGames : 0,
		ratioFauxJuste : 0,
		ratioDisplayed : 0,
		level : 0
	};

	var fields = {
		reponse_user : $('#reponse_user'),
		time : $('#time')
	}

	var sounds = {};

	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 0 // The length of each line
	, width: 8 // The line thickness
	, radius: 23 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1.4 // Rounds per second
	, trail: 47 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('spinner')
	var spinner = new Spinner(opts);


// génére le calcul en fonction du niveau du joueur
function generateCalcul(){
	clearFields();
	$("#stats").html("J: "+personne.nb_juste+" | T: "+personne.totalGames+" | JA: "+personne.justes_affilee+" | FA: "+personne.faux_affilee+" | D: "+personne.difficulty+" | TD: "+personne.totalDifficulty);
	calcul.a = Math.floor((Math.random() * (9+personne.difficulty)) + 1);
	calcul.b = Math.floor((Math.random() * (9+personne.difficulty)) + 1);
	calcul.reponse = calculateReponse(calcul.a,calcul.b);

	$('#calcul').html(calcul.a+calcul.reponse.operator+calcul.b+" = ?");
}

function testReponse(e){
	var user_reponse = $('#reponse_user').val();
	var betweenTime = calculateBetweenTime();
	if(user_reponse == calcul.reponse.number){
		$("#calcul").html(calcul.a+calcul.reponse.operator+calcul.b+" = <span class='dope'>"+calcul.reponse.number+"</span>");
		$('#time').html("Time: "+betweenTime+"s");
		personne.nb_juste+=1;
		personne.justes_affilee+=1;
		personne.faux_affilee=0;
	}
	else{
		$("#calcul").html(calcul.a+calcul.reponse.operator+calcul.b+" = <span class='nope'>&nbsp;"+user_reponse+"&nbsp;</span>&nbsp;"+calcul.reponse.number);
		$('#time').html("Time: "+betweenTime+"s");
		personne.nb_faux+=1;
		personne.justes_affilee=0;
		personne.faux_affilee+=1;
	}

	startNewGame();
}


function calculateReponse(a,b){
	var x = Math.floor((Math.random() * 3) + 1);
	if(x == 1){
		return {number:a+b, operator:"+"};
	}
	if(x == 2 && personne.level > 0){
		return {number:a-b, operator:"-"};
	}
		else if(x == 3 && personne.level > 1){
		return {number:a*b, operator:"*"};
	}

	else {
			return {number:a+b, operator:"+"};
	}
}

function calculateDifficulty(){
	personne.totalGames = personne.nb_faux + personne.nb_juste;
	personne.ratioFauxJuste = (personne.nb_juste / personne.nb_faux).toFixed(1);
	if(!isFinite(personne.ratioFauxJuste))personne.ratioDisplayed = "&infin;";

	if(personne.justes_affilee > 0)personne.totalDifficulty+=1;
	if(personne.justes_affilee > 5)personne.totalDifficulty+=2;
	if(personne.faux_affilee > 0)personne.totalDifficulty-=1;
	if(personne.faux_affilee > 3)personne.totalDifficulty-=2;

	if(personne.totalDifficulty < 0)personne.totalDifficulty=0;


	personne.difficulty = personne.totalDifficulty%calcul.palier;
}

function calculateBetweenTime(){
	var currentTime = new Date();
	var betweenTime = (currentTime - calcul.startTime)/1000;
	return betweenTime;
}

function calculateLevels(){
	personne.level = (Math.floor(personne.totalDifficulty/calcul.palier));
	if((personne.difficulty/calcul.palier)>=1){
		personne.difficulty = 0;
	}

	$('#lvl').val((personne.difficulty/calcul.palier)*100);
	$('#level').html(personne.level);
	$('#percentage').html(((personne.difficulty/calcul.palier)*100).toFixed(0)+"%");
}

function save(){
	window.localStorage.clear();
  window.localStorage.setItem("personne", JSON.stringify(personne));
}

function load(next){
	spinner.spin(target);

	if(window.localStorage.getItem("personne")){
		personne = JSON.parse(window.localStorage.getItem("personne"));
	}
	next();
}

function startNewGame(){
	setTimeout(function(){
		calculateDifficulty();
		calcul.startTime = Date.now();
		calculateLevels();
		save();
		generateCalcul();
	}, 2000);
}

function clearFields(){
	fields.reponse_user.val('');
	fields.time.html('');
	fields.reponse_user.focus();
}


	load(function(){
	  spinner.stop();
		$('#display').fadeIn();
		$('#progress').fadeIn();
		$('#user').fadeIn();

		calculateLevels();
		generateCalcul();
	});
