var msg;


function loadLanguage(){
	var language = window.navigator.language;

	switch(language) {
	case 'fr':
    case 'fr-FR':
    case 'fr-BE':
    case 'fr-CA':
        msg=FR;
        break;
        
    default:
        msg=EN;
	}
}

loadLanguage();
