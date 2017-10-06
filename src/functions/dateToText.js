export default (date) => {

	const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
	let formattedDate = '';
	if(date !== ''){
		const currentDate = new Date(date);
		const day = currentDate.getDate();
		const month = currentDate.getMonth(); 
		const year = currentDate.getFullYear();
		formattedDate = monthNames[month] + " " + day + ", " + year;
	}

	return formattedDate; 
}


