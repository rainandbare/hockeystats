import { FETCH_PLAYERS, SORT_PLAYERS, FILTER_PLAYERS } from '../actions/action_types.js'


export function playerReducer(state = { list: {}, sortRules: {} }, action) {
	switch(action.type){
		case FETCH_PLAYERS:
			//console.log(action.payload.playersList, 'from REDUCER')
			
			const newState = {
				list:action.payload.playersList, 
				sortRules: {}
			}
			return newState
		// case ADD_PLAYER:
		// 	const newState = {
		// 		...state
		// 	}
		// 	newState[action.id] = {firstName: action.firstName, "lastName": action.lastName, "birthYear": action.birthYear}
		// 	return newState
		case SORT_PLAYERS:
		case FILTER_PLAYERS:
			const newSortState = state;
			newSortState.sortRules = action.payload;
			console.log(newSortState)
			return newSortState
		default:
			return state
	}

}

