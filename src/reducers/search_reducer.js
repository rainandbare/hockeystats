import { UPDATE_SEARCH } from '../actions/action_types';

export function searchReducer(state = {}, action) {
	switch(action.type){
		case UPDATE_SEARCH:
		//console.log(action.payload,  'from SEARCH REDUCER')
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
