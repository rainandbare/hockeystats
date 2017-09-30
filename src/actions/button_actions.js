import { FETCH_BUTTONS } from './action_types';
import * as firebase from 'firebase';	
import slug from '../functions/slug'

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
const ref = database.ref('/buttons');

export function fetchButtons() {
	return dispatch => {
		ref.on('value', snapshot => {
			dispatch({
				type: FETCH_BUTTONS,
				payload: snapshot.val()
			})
		})
	}

 }

export function addButton(values, order){
  const buttonObject = {};

  buttonObject.buttonName = values.buttonName;
  buttonObject.buttonLabel = slug(values.buttonName);
  buttonObject.order = order;
  delete values.buttonName;
  const columns = values;
  buttonObject.columns = columns;

  return dispatch => ref.push(buttonObject);
}
export function deleteButton(key) {
	return dispatch => ref.child(key).remove();
}
export function changeOrder(key, info) {
  return dispatch => database.ref('/buttons/' + key + '/order').set(info);
}

