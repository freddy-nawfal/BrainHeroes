var msg;


function loadLanguage(){
	var language = window.navigator.language;

	switch(language) {
	case 'fr':
    case 'fr-FR':
        msg=FR;
        break;
        
    default:
        msg=EN;
	}
}

loadLanguage();
