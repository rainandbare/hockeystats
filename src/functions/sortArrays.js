export default (initialArray, sortBy) => {
	const result = sortBy.map((newIndex) => {
			return initialArray[newIndex]	
		});
	return result; 
}

