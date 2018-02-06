import { FETCH_PLAYERS, SORT_PLAYERS, FILTER_PLAYERS } from './action_types';
import * as firebase from 'firebase';

export const database = firebase.database();

const ref = database.ref('/')

export function fetchPlayers() {
	return dispatch => {
		ref.on('value', snapshot => {
			dispatch({
				type: FETCH_PLAYERS,
				payload: snapshot.val()
			})
		})
	}

 }

function sortPlayerIndexes(columnKey, sortDir, keysArray, players){
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

export function sortPlayers(columnKey, sortDir, keysArray, players){

	const sortIndexes = sortPlayerIndexes(columnKey, sortDir, keysArray, players);

  	return {
		type: SORT_PLAYERS,
		payload: sortIndexes
	};
}

export function filterPlayers(term, keysArray, players, columnKey, multiple, sortRule){
		const sortColumnKey = Object.keys(sortRule);
		const sortDir = Object.values(sortRule);
		console.log(sortColumnKey, sortDir);
		let filteredIndexes = [];
		// let sortedFilterdIndexes = [];
    	if(multiple){
    		//if multiple rows have search terms
    		// console.log('multiple filter rows')
 			let midfilteredIndexes = [];
    		let beginningKeysArray = keysArray
    		// console.log(term)
     		for (var index = 0; index < columnKey.length; index++) {
    			//for each column that has a search term in it -> columnKey[index] = "position"
    			for (var jindex = 0; jindex < beginningKeysArray.length; jindex++) {
     				//go through each of the keys in the Keys array
					const columnData = players[beginningKeysArray[jindex]][columnKey[index]];
    				const filterBy = term[index].toLowerCase()
    				// console.log(columnData)
					if (columnData.toString().toLowerCase().indexOf(filterBy) !== -1) {
						midfilteredIndexes.push(beginningKeysArray[jindex]);
			     	}
				}
				beginningKeysArray = midfilteredIndexes;
				midfilteredIndexes = [];
    		}
 			filteredIndexes = beginningKeysArray;
 			// console.log(filteredIndexes)
    	} else {
    		//if just on row has a search term
    		// console.log('just one filter row')
    		// console.log(term, 'term from PLAYER ACTIONS')
			const filterBy = term.toLowerCase();
		 	if (term === '') {
		      	filteredIndexes = keysArray;
		    } else {
			    for (var kindex = 0; kindex < keysArray.length; kindex++) {
					const columnData = players[keysArray[kindex]][columnKey].toString();
			      	if (columnData.toString().toLowerCase().indexOf(filterBy) !== -1) {
			        	filteredIndexes.push(keysArray[kindex]);
			      	}
				}
		    }
		}

		filteredIndexes = sortPlayerIndexes(sortColumnKey, sortDir, filteredIndexes, players);

	return {
		type: FILTER_PLAYERS,
		payload: filteredIndexes
	};
}

export function addPlayer(player){
  return dispatch => database.ref('/playersList').push(player)
}
export function deletePlayer(key) {
	return dispatch => database.ref('/playersList').child(key).remove();
}
export function editPlayer(info, key) {
  // console.log(info, key)
  return dispatch => database.ref('/playersList/' + key).set(info);
}
