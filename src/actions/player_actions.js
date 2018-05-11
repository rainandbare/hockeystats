import { CLEAR_PLAYERS, FETCH_PLAYERS, SORT_PLAYERS, FILTER_PLAYERS } from './action_types';
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

export function clearPlayers() {
	return dispatch => {
		database.ref('/playersList').once('value').then(function(snapshot) {
		 	dispatch({
				type: CLEAR_PLAYERS,
				payload: snapshot.val()
			})
		});
	}
	
 }

function sortPlayerIndexes(columnKey, sortDir, keysArray, players){
	//console.log(columnKey, sortDir, keysArray, players);

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
		var valueA = players[indexA][columnKey].replace(/['"]+/g, '');
    	var valueB = players[indexB][columnKey].replace(/['"]+/g, '');
 		if(typeof valueA === 'string'){
            valueA = valueA.toLowerCase();
        }
        if(typeof valueB === 'string'){
            valueB = valueB.toLowerCase();
        }
	    if (sortDir === SortTypes.ASC) {
		  	if(valueA === "" || valueA === null || valueA === undefined) return -1;
		    if(valueB === "" || valueB === null || valueB === undefined) return 1;
		    if(valueA === valueB) return 0;
		    return valueA > valueB ? -1 : 1;
	 	} else {
		    if(valueA === "" || valueA === null || valueA === undefined) return 1;
		    if(valueB === "" || valueB === null || valueB === undefined) return -1;
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
		var sortColumnKey = Object.keys(sortRule);
		var sortDir = Object.values(sortRule);
		if(Object.keys(sortRule).length === 0 && sortRule.constructor === Object){
			sortColumnKey = columnKey;
			sortDir = 'DESC';
		}
		let filteredIndexes = [];
    	if(multiple){
    		//if multiple rows have search terms
 			let midfilteredIndexes = [];
    		let beginningKeysArray = keysArray
    		// console.log(term)
     		for (var index = 0; index < columnKey.length; index++) {
    			//for each column that has a search term in it -> columnKey[index] = "position"
    			for (var jindex = 0; jindex < beginningKeysArray.length; jindex++) {
     				//go through each of the keys in the Keys array
					var columnData = players[beginningKeysArray[jindex]][columnKey[index]];
    				const filterBy = term[index].toLowerCase()
    				
    				if (columnData === undefined){
						columnData = '';
					}
					if ((columnData.toString().toLowerCase().indexOf(filterBy) !== -1) || (columnData.toString().toLowerCase().replace(/['"]+/g, '').indexOf(filterBy) !== -1))  {
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
			const filterBy = term.toLowerCase();
		 	if (term === '') {
		      	filteredIndexes = keysArray;
		    } else {
			    for (var kindex = 0; kindex < keysArray.length; kindex++) {
			    	// console.log(keysArray)
			    	if(keysArray.indexOf('none') === -1){
						columnData = players[keysArray[kindex]][columnKey];
						// console.log(columnData.replace(/['"]+/g, ''));
			    	}
					if (columnData === undefined){
						columnData = '';
					}
			      	if ((columnData.toString().toLowerCase().indexOf(filterBy) !== -1) || (columnData.toString().toLowerCase().replace(/['"]+/g, '').indexOf(filterBy) !== -1)) {
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
  return dispatch => database.ref('/playersList').push(player);
}
export function deletePlayer(key) {
	return dispatch => database.ref('/playersList').child(key).remove();
}
export function editPlayer(info, key) {
  // console.log(info, key)
  return dispatch => database.ref('/playersList/' + key).set(info);
}
export function addCertToPlayer(type, key, info){
	const typeChart = {
		"D" : "hasDeathCert",
		"B" : "hasBirthCert"
	}
	info[typeChart[type]] = true;
	return dispatch => database.ref('/playersList/' + key).set(info);
}
export function removeCertFromPlayer(key, type){
	const typeChart = {
		death : "hasDeathCert",
		birth: "hasBirthCert"
	}
	return dispatch => database.ref('/playersList/' + key).child(typeChart[type]).remove();
}
