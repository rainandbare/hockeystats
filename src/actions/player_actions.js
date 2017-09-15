import { FETCH_PLAYERS, SORT_PLAYERS } from './action_types';
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
