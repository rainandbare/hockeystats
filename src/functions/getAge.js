export default (birthDateString, deathDateString) => {
	    const deathDate = new Date(deathDateString);
	    const birthDate = new Date(birthDateString);
	   
	    const milliseconds = deathDate - birthDate;

	    const age = (milliseconds / 1000 / 60 / 60 / 24 / 365).toFixed(2);
	    return age;
	}