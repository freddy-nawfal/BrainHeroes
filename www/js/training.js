
// objet contenant un nombre a et un nombre b ainsi que la réponse du calcul
	var calcul ={
		a :0,
		b :0,
		reponse:{},
		startTime : new Date()
	};
// objet contenant la difficulte lié au niveau du joueur, le nombre de calcul faux réalisé, le nombre de calcul juste, le nombre de calcul effectué et le ratio du joueur
	var personne = {
		difficulty : 0,
		nb_faux : 0,
		nb_juste : 0,
		totalGames : 0,
		ratioFauxJuste : 0,
		ratioDisplayed : 0

	};
// génére le calcul en fonction du niveau du joueur
function generateCalcul(){
	document.getElementById("reponse").innerHTML = "";
	document.getElementById("reponse_user").value = "";
	$('#time').html("");
	document.getElementById("reponse_user").focus();
	document.getElementById("difficulte").innerHTML = "D: "+personne.difficulty+" | R: "+personne.ratioDisplayed+" | G: "+personne.totalGames;
	calcul.a = Math.floor((Math.random() * 9+personne.difficulty) + 1);
	calcul.b = Math.floor((Math.random() * 9+personne.difficulty) + 1);
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
	}
	else{
		document.getElementById("calcul").innerHTML = calcul.a+calcul.reponse.operator+calcul.b+" = <span class='nope'>&nbsp;"+user_reponse+"&nbsp;</span>&nbsp;"+calcul.reponse.number;
		$('#time').html("Time: "+betweenTime+"s");
		personne.nb_faux+=1;

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


	if(personne.ratioFauxJuste > 1) personne.difficulty+=1;
	if(personne.ratioFauxJuste <=1) personne.difficulty-=1;
	if(personne.ratioFauxJuste < 0.5) personne.difficulty-=1;

	if(personne.difficulty <= 0) personne.difficulty = 0;
}

function calculateBetweenTime(){
	var currentTime = new Date();
	var betweenTime = (currentTime - calcul.startTime)/1000;
	return betweenTime;
}



function startNewGame(){
	setTimeout(function(){
		calculateDifficulty();
		calcul.startTime = Date.now();
		generateCalcul();
	}, 2000);
}


generateCalcul();
