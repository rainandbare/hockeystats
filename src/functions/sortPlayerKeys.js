export default (columnKey, sortDir, keysArray, players) => {
	const SortTypes = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	};
  	const sortKeysArray = [];

    for (var index = 0; index < keysArray.length; index++) {
      sortKeysArray.push(keysArray[index]);
    }
    var sortIndexes = sortKeysArray.slice();

	sortIndexes.sort(function(indexA, indexB) {
		var valueA = players[indexA][columnKey];
	    var valueB = players[indexB][columnKey];
 		if(valueA !== undefined){
            valueA = valueA.toLowerCase();
        }
        if(valueB !== undefined){
            valueB = valueB.toLowerCase();
        }
	    if (sortDir === SortTypes.ASC) {
		  	if(valueA === "" || valueA === null) return -1;
		    if(valueB === "" || valueB === null) return 1;
		    if(valueA === valueB) return 0;
		    return valueA > valueB ? -1 : 1;
	 	} else {
		    if(valueA === "" || valueA === null) return 1;
		    if(valueB === "" || valueB === null) return -1;
		    if(valueA === valueB) return 0;
		    return valueA < valueB ? -1 : 1;
	 	}
	});
	return sortIndexes;
}
