import { LOG_IN, LOG_OUT } from '../actions/action_types.js'


export function authReducer(state = false, action) {
	switch(action.type){
		case LOG_IN:
		// console.log(action.payload, 'from AUTH REDUCER')
			return action.payload
		case LOG_OUT:
		// console.log(action.payload, 'from AUTH REDUCER')
			return action.payload
		default:
			return state
	}

}

