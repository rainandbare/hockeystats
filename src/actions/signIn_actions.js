import { LOG_IN, LOG_OUT, LOG_IN_FAILED } from './action_types'

import * as firebase from 'firebase';

export function signIn(values){
	  return dispatch => firebase.auth().signInWithEmailAndPassword(values.email, values.password).catch(function(error) {
		  // Handle Errors here.
		  // var errorCode = error.code;
		  // var errorMessage = error.message;
		  // console.log(error)
		  dispatch({
			type: LOG_IN_FAILED,
			payload: "Your username or password is incorrect."
			})
		 })
}
export function logOut() {
	return dispatch => firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	  dispatch({
			type: LOG_OUT,
			payload: false
		})
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
