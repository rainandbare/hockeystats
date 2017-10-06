import { FETCH_PLAYERS, SORT_PLAYERS, FILTER_PLAYERS } from '../actions/action_types.js'


export function playerReducer(state = { list: {}, sortRules: {} }, action) {
	switch(action.type){
		case FETCH_PLAYERS:
			const newState = {
				list:action.payload.playersList, 
				sortRules: {}
			}
			return newState
		case SORT_PLAYERS:
		case FILTER_PLAYERS:
			const newSortState = state;
			newSortState.sortRules = action.payload;
			return newSortState
		default:
			return state
	}

}

