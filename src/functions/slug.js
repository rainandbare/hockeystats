export default (name) => {
	//remove spaces and special characters
	const noSpaces = name.replace(/[^\w]/gi, '').split('');
	//remove first capital and make it lowercase
	const firstLetter = noSpaces.shift().toLowerCase();
	//add lowercase back onto letter array
	noSpaces.unshift(firstLetter);
	const slug = noSpaces.join('');
	return slug; 
}