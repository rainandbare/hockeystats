import { FETCH_BUTTONS } from '../actions/action_types.js'


export function buttonsReducer(state = {}, action) {
	switch(action.type){
		case FETCH_BUTTONS:
			return action.payload
		default:
			return state
	}

}

