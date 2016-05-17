	var a = 0;
	var b = 0;
	var reponse = {};
	var difficulty = 0;
	var nb_juste = 0;
	var nb_faut = 0;
	var totalGames = 0;
	var ratioFauxJuste = 0;
	var startTime = new Date();

function generateCalcul(){
	document.getElementById("reponse").innerHTML = "";
	document.getElementById("reponse_user").value = "";
	document.getElementById("reponse_user").focus();
	document.getElementById("difficulte").innerHTML = "Difficulté: "+difficulty+" | Ratio: "+ratioFauxJuste+" | Total Games: "+totalGames;
	a = Math.floor((Math.random() * 9+difficulty) + 1);
	b = Math.floor((Math.random() * 9+difficulty) + 1);
	reponse = calculateReponse(a,b);

	document.getElementById('calcul').innerHTML = "Résolvez "+a+reponse.operator+b;
}

function testReponse(e){
	var user_reponse = document.getElementById("reponse_user").value;
	var betweenTime = calculateBetweenTime();
	if(user_reponse == reponse.number){
		document.getElementById("reponse").innerHTML = "Nice man ! Vous avez pris "+betweenTime+"s";
		nb_juste+=1;
	}
	else{
		document.getElementById("reponse").innerHTML = "Mauvaise réponse ! c'était: "+reponse.number;
		nb_faut+=1;
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
	totalGames = nb_faut + nb_juste;
	ratioFauxJuste = (nb_juste / nb_faut).toFixed(1);
	
	if(ratioFauxJuste > 1) difficulty+=1;
	if(ratioFauxJuste <=1) difficulty-=1;
	if(ratioFauxJuste < 0.5) difficulty-=1;

	if(difficulty <= 0) difficulty = 0;
}

function calculateBetweenTime(){
	var currentTime = new Date();
	var betweenTime = (currentTime - startTime)/1000;
	return betweenTime;
}



function startNewGame(){
	setTimeout(function(){ 
		calculateDifficulty();
		startTime = Date.now();
		generateCalcul(); 
	}, 2000);
}


generateCalcul();
