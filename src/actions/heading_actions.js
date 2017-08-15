import { FETCH_HEADINGS } from './action_types';
import * as firebase from 'firebase';

const database = firebase.database();
const ref = database.ref('/headings')

export function fetchHeadings() {
	return dispatch => {
		ref.on('value', snapshot => {
			dispatch({
				type: FETCH_HEADINGS,
				payload: snapshot.val()
			})
		})
	}

 }

export function addHeading(heading) {
	return dispatch => database.ref('/headings').push(heading)
}

export function deleteHeading(key) {
	return dispatch => database.ref('/headings').child(key).remove();
}

  	 
// export function addPlayer(player){
//   return dispatch => ref.push(player)
// }
// export function deletePlayer(key) {
// 	return dispatch => ref.child(key).remove();
// }
