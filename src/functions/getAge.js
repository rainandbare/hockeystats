export default (birthDateString, deathDateString) => {
	    const deathDate = new Date(deathDateString);
	    const birthDate = new Date(birthDateString);

	    const deathYear = deathDate.getUTCFullYear();

    	let years = deathYear - birthDate.getUTCFullYear();

    	var birthMonth = (1 + birthDate.getUTCMonth()).toString();
    	birthMonth = birthMonth.length > 1 ? birthMonth : '0' + birthMonth;
    	
    	var deathMonth = (1 + deathDate.getUTCMonth()).toString();
    	deathMonth = deathMonth.length > 1 ? deathMonth : '0' + deathMonth;

		var birthDay = birthDate.getUTCDate().toString();
    	var deathDay = deathDate.getUTCDate().toString();
    	var deathDateFormatted = deathMonth + "/" + deathDay + "/" + deathYear;
    	let days, lastBirthday, decimal;
    	lastBirthday = birthMonth + "/" + birthDay + "/" + deathYear;
		days = date_diff_indays(lastBirthday, deathDateFormatted);
		decimal = ((days / 356) + years).toFixed(2);
		return decimal;

  //   	//if the birth month is less than the death month
		// if(birthMonth > deathMonth){
		// 	years = years - 1;
		// 	//how many days from their last birthday to there death day
		// 	lastBirthday = birthMonth + "/" + birthDay + "/" + deathYear;
		// 	days = date_diff_indays(lastBirthday, deathDateFormatted);
		// 	decimal = ((days / 356) + years).toFixed(2);
		// 	return decimal;


		// } else if(birthMonth < deathMonth){
		// 	//how many days from their last birthday to there death day
		// 	lastBirthday = birthMonth + "/" + birthDay + "/" + deathYear;
		// 	days = date_diff_indays(lastBirthday, deathDateFormatted);
		// 	decimal = ((days / 356) + years).toFixed(2);
		// 	return decimal;

		// } else if(birthMonth === deathMonth){
		// 	if(birthDay < deathDay){
		// 		//how many days from their last birthday to there death day
		// 		lastBirthday = birthMonth + "/" + birthDay + "/" + deathYear;
		// 		days = date_diff_indays(lastBirthday, deathDateFormatted);
		// 		decimal = ((days / 356) + years).toFixed(2);
		// 		return decimal;
		// 	} else if(birthDay > deathDay){
		// 		//how many days from their last birthday to there death day
		// 		lastBirthday = birthMonth + "/" + birthDay + "/" + deathYear;
		// 		days = date_diff_indays(lastBirthday, deathDateFormatted);
		// 		decimal = ((days / 356) + years).toFixed(2);
		// 		 return decimal;

		// 	} else if(birthDay === deathDay){
		// 		milliseconds = 0;
		// 	}
		//}
	
	   	function date_diff_indays (date1, date2) {
			const dt1 = new Date(date1);
			const dt2 = new Date(date2);
			return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
		}

	}