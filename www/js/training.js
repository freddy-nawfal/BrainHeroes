
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
		totalDifficulty : 0,
		nb_faux : 0,
		nb_juste : 0,
		justes_affilee : 0,
		top_justes_affilee : 0,
		faux_affilee : 0,
		times : [],

		totalGames : function(){
			return (this.nb_juste + this.nb_faux);
		},
		ratioDisplayed : function(){
			if(!isFinite(this.ratioFauxJuste())) return "&infin;";
			else return this.ratioFauxJuste();
		},
		difficulty : function(){
			if(((this.totalDifficulty%calcul.palier)/calcul.palier)>=1){
				return 0;
			}
			else{
				return (this.totalDifficulty%calcul.palier);
			}
		},
		ratioFauxJuste : function(){
				return (this.nb_juste / this.nb_faux);
		},
		level : function(){
			return (Math.floor(personne.totalDifficulty/calcul.palier));
		},
		AverageTime : function(){
			var all = 0;
			for (var i = 0; i < this.times.length; i++) {
					all += this.times[i];
				}
				return (all/this.times.length).toFixed(3);
			}
	};

	var fields = {
		reponse_user : $('#reponse_user'),
		time : $('#time')
	}

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
	calcul.a = Math.floor((Math.random() * (9+personne.difficulty())) + 1);
	calcul.b = Math.floor((Math.random() * (9+personne.difficulty())) + 1);
	calcul.reponse = calculateReponse(calcul.a,calcul.b);

	$('#calcul').html(calcul.a+calcul.reponse.operator+calcul.b+" = ?");
}

function testReponse(e){
	var user_reponse = $('#reponse_user').val();
	var betweenTime = calculateBetweenTime().toFixed(3);
	if(user_reponse == calcul.reponse.number){
		$("#calcul").html(calcul.a+calcul.reponse.operator+calcul.b+" = <span class='dope'>"+calcul.reponse.number+"</span>");
		$('#time').html("Time: "+betweenTime+"s");
		personne.nb_juste+=1;
		personne.justes_affilee+=1;
		if(personne.justes_affilee > personne.top_justes_affilee) personne.top_justes_affilee = personne.justes_affilee;
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
	if(x == 2 && personne.level() > 0){
		return {number:a-b, operator:"-"};
	}
		else if(x == 3 && personne.level() > 1){
		return {number:a*b, operator:"*"};
	}

	else {
			return {number:a+b, operator:"+"};
	}
}

function calculateDifficulty(){
	if(personne.justes_affilee > 0)personne.totalDifficulty+=1;
	if(personne.justes_affilee > 5)personne.totalDifficulty+=2;
	if(personne.faux_affilee > 0)personne.totalDifficulty-=1;
	if(personne.faux_affilee > 3)personne.totalDifficulty-=2;

	if(personne.totalDifficulty < 0)personne.totalDifficulty=0;
}

function calculateBetweenTime(){
	var currentTime = new Date();
	var betweenTime =((currentTime - calcul.startTime)/1000) - timeSlided;
	timeSlided = 0;
	personne.times.push(betweenTime);
	return betweenTime;
}

function displayLevel(){
	$('#lvl').val((personne.difficulty()/calcul.palier)*100);
	$('#level').html(personne.level());
	$('#percentage').html(((personne.difficulty()/calcul.palier)*100).toFixed(0)+"%");
}

function save(){
	var toSave = {
		totalDifficulty : personne.totalDifficulty,
		nb_faux : personne.nb_faux,
		nb_juste : personne.nb_juste,
		justes_affilee : personne.justes_affilee,
		top_justes_affilee : personne.top_justes_affilee,
		faux_affilee : personne.faux_affilee,
		times : personne.times
	}
	window.localStorage.removeItem("personne");
  window.localStorage.setItem("personne", JSON.stringify(toSave));
}

function load(next){
	spinner.spin(target);

	if(window.localStorage.getItem("personne")){
		var gotSaves = JSON.parse(window.localStorage.getItem("personne"));
		for (var key in gotSaves) {
		  if (gotSaves.hasOwnProperty(key)) {
				personne[key] = gotSaves[key];
		  }
		}
	}
	next();
}

function startNewGame(){
	setTimeout(function(){
		calculateDifficulty();
		calcul.startTime = Date.now();
		displayLevel();
		save();
		generateCalcul();
	}, 1000);
}

function clearFields(){
	fields.reponse_user.val('');
	fields.time.html('');
	fields.reponse_user.focus();
}

$(window).load(function(){
	load(function(){
	  spinner.stop();
		$('#display').fadeIn();
		$('#progress').fadeIn();
		$('#user').fadeIn();

		displayLevel();
		generateCalcul();
	});
});
