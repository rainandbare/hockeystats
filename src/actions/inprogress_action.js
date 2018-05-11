import { FETCH_INPROGRESS } from './action_types';
import * as firebase from 'firebase';

const database = firebase.database();
const ref = database.ref('/inprogress')

export function fetchInProgress() {
	return dispatch => {
		ref.on('value', snapshot => {
			dispatch({
				type: FETCH_INPROGRESS,
				payload: snapshot.val()
			})
		})
	}

 }

export function addInProgress(newData, type) {
	console.log(type);
	return dispatch => database.ref('/inprogress/'+ type +'/entries').push(newData);
}

export function deleteInProgress(type, key) {
	console.log(key, "delete player")
	return dispatch => database.ref('/inprogress/'+ type +'/entries').child(key).remove();
}

export function editInProgress(type, info, key) {
  return dispatch => database.ref('/inprogress/' + type + '/entries/' + key).set(info);
}
	 