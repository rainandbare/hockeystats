import { LOG_IN, LOG_OUT } from './action_types'

import * as firebase from 'firebase';

// export const auth = firebase.auth();


export function signIn(values){
	console.log(values.email, values.password)
	  return dispatch => firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
		//   // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		//   // ...
		 })
}
export function logOut() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
}


export function isUserSignedIn() {
	return dispatch => {
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    //console.log(user.email + " is signed in")
		    dispatch({
				type: LOG_IN,
				payload: user.email
			})
		  } else {
		    // No user is signed in.
		    //console.log("no user is signed in")
		    dispatch({
				type: LOG_OUT,
				payload: false
			})
		  }
		});

	}

 }
