
// objet contenant un nombre a et un nombre b ainsi que la réponse du calcul
	var calcul ={
		a :0,
		b :0,
		reponse:{},
		startTime : new Date(),
		palier : 5
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
// génére le calcul en fonction du niveau du joueur
function generateCalcul(){
	document.getElementById("reponse_user").value = "";
	$('#time').html("");
	document.getElementById("reponse_user").focus();
	document.getElementById("stats").innerHTML = "J: "+personne.nb_juste+" | T: "+personne.totalGames+" | JA: "+personne.justes_affilee+" | FA: "+personne.faux_affilee+" | D: "+personne.difficulty+" | TD: "+personne.totalDifficulty;
	calcul.a = Math.floor((Math.random() * (9+personne.difficulty)) + 1);
	calcul.b = Math.floor((Math.random() * (9+personne.difficulty)) + 1);
	calcul.reponse = calculateReponse(calcul.a,calcul.b);

	document.getElementById('calcul').innerHTML = calcul.a+calcul.reponse.operator+calcul.b+" = ?";
}

function testReponse(e){
	var user_reponse = document.getElementById("reponse_user").value;
	var betweenTime = calculateBetweenTime();
	if(user_reponse == calcul.reponse.number){
		document.getElementById("calcul").innerHTML = calcul.a+calcul.reponse.operator+calcul.b+" = <span class='dope'>"+calcul.reponse.number+"</span>";
		$('#time').html("Time: "+betweenTime+"s");
		personne.nb_juste+=1;
		personne.justes_affilee+=1;
		personne.faux_affilee=0;
	}
	else{
		document.getElementById("calcul").innerHTML = calcul.a+calcul.reponse.operator+calcul.b+" = <span class='nope'>&nbsp;"+user_reponse+"&nbsp;</span>&nbsp;"+calcul.reponse.number;
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
	if(x == 2){
		return {number:a-b, operator:"-"};
	}
	if(x == 3){
		return {number:a*b, operator:"*"};
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

	console.log(personne.level);

	$('#lvl').val((personne.difficulty/calcul.palier)*100);
	$('#level').html(personne.level);
}


function startNewGame(){
	setTimeout(function(){
		calculateDifficulty();
		calcul.startTime = Date.now();
		calculateLevels();
		generateCalcul();
	}, 2000);
}


generateCalcul();
