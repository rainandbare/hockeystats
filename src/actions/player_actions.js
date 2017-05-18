import { FETCH_PLAYERS} from './action_types';
import * as firebase from 'firebase';

// const initialState = {
// 						"348239847293847": {firstName: "Belinda", "lastName":  "Berthins", "birthYear": 2004}, 
// 						"454354243542435": {firstName: "Orwell", "lastName": "Rights", "birthYear": 1985}, 
// 						"454394243542435": {firstName: "Mary", "lastName": "Merry", "birthYear": 1342}, 
// 					}


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUFYaNTBSu5bkFcK5dsxaDIuagON__To4",
    authDomain: "nhl-players-f43b3.firebaseapp.com",
    databaseURL: "https://nhl-players-f43b3.firebaseio.com",
    projectId: "nhl-players-f43b3",
    storageBucket: "nhl-players-f43b3.appspot.com",
    messagingSenderId: "428887673172"
  };
  firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref('/')


// let nextTodoId = 0;

// export function fetchPlayers() {
// 	return {
// 		type: FETCH_PLAYERS,
// 		payload: initialState
// 	}
// }

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

// export function addPlayer(firstName, lastName, birthYear) {
//   return {
//     type: ADD_PLAYER,
//     id: nextTodoId++,
//     firstName,
//     lastName,
//     birthYear
//   }
// }

export function addPlayer(player){
  return dispatch => ref.push(player)
}
export function deletePlayer(key) {
	return dispatch => ref.child(key).remove();
}

// export function deletePlayer(key){
// 	return {
// 		type: DELETE_PLAYER,
// 		payload: key
// 	}
// }