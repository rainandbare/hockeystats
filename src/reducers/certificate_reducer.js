import { FETCH_CERTIFICATES } from '../actions/action_types.js'


export function certificateReducer(state = [], action) {
	switch(action.type){
		case FETCH_CERTIFICATES :
		// console.log(action.payload.certificates, 'from REDUCER')
			return action.payload
		// case ADD_PLAYER:
		// 	const newState = {
		// 		...state
		// 	}
		// 	newState[action.id] = {firstName: action.firstName, "lastName": action.lastName, "birthYear": action.birthYear}
		// 	return newState
		default:
			return state
	}

}

