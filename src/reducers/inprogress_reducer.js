import { FETCH_INPROGRESS } from '../actions/action_types.js'


export function inProgressReducer(state = {}, action) {
	switch(action.type){
		case FETCH_INPROGRESS:
			return action.payload
		default:
			return state
	}

}

