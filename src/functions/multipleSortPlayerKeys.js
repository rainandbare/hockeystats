export default (columnKeyArray, sortDir, keysArray, players) => {
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
		var valueA = players[indexA][columnKeyArray[0]];
	    var valueB = players[indexB][columnKeyArray[0]];
	    
	    var valueAA = players[indexA][columnKeyArray[1]];
	    var valueBB = players[indexB][columnKeyArray[1]];

	    var valueAAA = players[indexA][columnKeyArray[2]];
	    var valueBBB = players[indexB][columnKeyArray[2]];

 		if(valueA !== undefined){
            valueA = valueA.toLowerCase();
        }
        if(valueB !== undefined){
            valueB = valueB.toLowerCase();
        }
        
        if(valueAA !== undefined){
            valueAA = valueAA.toLowerCase();
        }
        if(valueBB !== undefined){
            valueBB = valueBB.toLowerCase();
        }

         if(valueAAA !== undefined){
            valueAAA = valueAAA.toLowerCase();
        }
        if(valueBBB !== undefined){
            valueBBB = valueBBB.toLowerCase();
        }

	    if (sortDir === SortTypes.ASC) {
		  	if(valueA === "" || valueA === null) return -1;
		    if(valueB === "" || valueB === null) return 1;
		    if(valueA === valueB) {
		    	if(valueAA === valueBB){
		    		return valueAAA > valueBBB ? -1 : 1;
		    	}
		    	return valueAA > valueBB ? -1 : 1;
		    }
		    return valueA > valueB ? -1 : 1;
	 	} else {
		    if(valueA === "" || valueA === null) return 1;
		    if(valueB === "" || valueB === null) return -1;
		    if(valueA === valueB) {
		    	if(valueAA === valueBB){
		    		return valueAAA < valueBBB ? -1 : 1;
		    	}
		    	return valueAA < valueBB ? -1 : 1;
		    }
		    return valueA < valueB ? -1 : 1;
	 	}
	});
	return sortIndexes;
}
