import { FETCH_PLAYERS} from './action_types';
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
