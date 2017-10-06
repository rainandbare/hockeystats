import { FETCH_HEADINGS } from '../actions/action_types.js'


export function headingReducer(state = {}, action) {
	switch(action.type){
		case FETCH_HEADINGS:
			return action.payload
		default:
			return state
	}

}

