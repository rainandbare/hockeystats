import { CLEAR_PLAYERS, FETCH_PLAYERS, SORT_PLAYERS, FILTER_PLAYERS } from '../actions/action_types.js'


export function playerReducer(state = { list: {}, sortRules: {} }, action) {
	switch(action.type){
		case FETCH_PLAYERS:
			const newState = {
				list: action.payload.playersList, 
				sortRules: state.sortRules
			}
			return newState
		case CLEAR_PLAYERS:
			const clearState = {
				list: action.payload, 
				sortRules: {}
			}
			return clearState
		case SORT_PLAYERS:
		case FILTER_PLAYERS:
			// console.log(action.payload, 'from Player Reducer')
			const newSortState = state;
			newSortState.sortRules = action.payload;
			return newSortState
		default:
			return state
	}

}

