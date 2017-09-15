

var isString = require('lodash.isstring');



export default (string, match) => {
	if(isString(string) && match.length > 2){
	 	var searchResult = string.search( new RegExp( match, 'gi' ));

	 	if(searchResult !== -1){
	 		return true;
	 	} else {
	 		return false;
	 	}

	 } else {
		return false;
	
	}
	return false;
}
