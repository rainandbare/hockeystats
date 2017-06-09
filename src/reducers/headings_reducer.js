import { FETCH_HEADINGS } from '../actions/action_types.js'


export function headingReducer(state = {}, action) {
	switch(action.type){
		case FETCH_HEADINGS:
		//console.log(action.payload, 'from HEADING REDUCER')
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

