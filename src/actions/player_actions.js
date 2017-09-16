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

export function sortPlayers(columnKey, sortDir, keysArray, players){

	const SortTypes = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	};
  	const sortKeysArray = [];

    for (var index = 0; index < keysArray.length; index++) {
      sortKeysArray.push(keysArray[index]);
    }
    var sortIndexes = sortKeysArray.slice();
    

    sortIndexes.sort((indexA, indexB) => {
	  	var valueA = players[indexA][columnKey];
	    var valueB = players[indexB][columnKey];

		var sortVal = 0;
		if (valueA > valueB) {
			sortVal = 1;
		}
		if (valueA < valueB) {
			sortVal = -1;
		}
		if (sortVal !== 0 && sortDir === SortTypes.ASC) {
		  	sortVal = sortVal * -1;
		}

		return sortVal;
	});

  	return {
		type: SORT_PLAYERS,
		payload: sortIndexes
	};
}

export function filterPlayers(term, keysArray, players, columnKey, multiple){

		let filteredIndexes = [];

    	if(multiple){
 			let midfilteredIndexes = [];
    		let beginningKeysArray = keysArray
     		for (var index = 0; index < columnKey.length; index++) {

   //  			//for each column that has a search term in it -> columnKey[index] = "position"
    			for (var jindex = 0; jindex < beginningKeysArray.length; jindex++) {
   //  				//go through each of the keys in the Keys array
					const columnData = players[beginningKeysArray[jindex]][columnKey[index]];
    				const filterBy = term[index].toLowerCase()
    				//console.log(columnData.toLowerCase().indexOf(filterBy))
					if (columnData.toLowerCase().indexOf(filterBy) !== -1) {
						midfilteredIndexes.push(beginningKeysArray[jindex]);
			     	}
				}
				beginningKeysArray = midfilteredIndexes;
				midfilteredIndexes = [];
    		}
 			filteredIndexes = beginningKeysArray;
    	} else {
			const filterBy = term.toLowerCase();
		 	if (term === '') {
		      	filteredIndexes = keysArray;
		    } else {
			    for (var index = 0; index < keysArray.length; index++) {
					const columnData = players[keysArray[index]][columnKey];
			      	if (columnData.toLowerCase().indexOf(filterBy) !== -1) {
			        	filteredIndexes.push(keysArray[index]);
			      	}
				}
		    }
		}

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
