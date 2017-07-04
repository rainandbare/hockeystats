import { FETCH_BUTTONS } from '../actions/action_types.js'


export function buttonsReducer(state = {}, action) {
	switch(action.type){
		case FETCH_BUTTONS:
		// console.log(action.payload, 'from BUTTON REDUCER');
			return action.payload
		// case ADD_HEADING:
		// 	const newState = {
		// 		...state
		// 	}
		// 	newState[action.id] = {firstName: action.firstName, "lastName": action.lastName, "birthYear": action.birthYear}
		// 	return newState
		default:
			return state
	}

}

