var msg;


function loadLanguage(){
	var language = window.navigator.language;

	switch(language) {
    case 'fr':
        msg=FR;
        break;
        
    default:
        msg=EN;
	}
}

loadLanguage();
