import { LOG_IN, LOG_OUT, LOG_IN_FAILED } from '../actions/action_types.js'


export function authReducer(state = {user: null, message: null, loggedIn: false}, action) {
	switch(action.type){
		case LOG_IN_FAILED:
			console.log(action.payload)
			const logInFailedState = {user: null, loggedIn: false, message: action.payload}
			return logInFailedState
		case LOG_IN:
		// console.log(action.payload, 'from AUTH REDUCER')
			const logInState = {user: action.payload, loggedIn: true, message: null}
			return logInState
		case LOG_OUT:
		// console.log(action.payload, 'from AUTH REDUCER')
			return {user: null , loggedIn: action.payload, message: null}
		default:
			return state
	}

}

