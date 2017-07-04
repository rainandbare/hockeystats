import { FETCH_PLAYERS } from '../actions/action_types.js'


export function playerReducer(state = {}, action) {
	switch(action.type){
		case FETCH_PLAYERS:
		//console.log(action.payload.playersList, 'from REDUCER')
			return action.payload.playersList
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

