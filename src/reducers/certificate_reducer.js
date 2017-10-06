import { FETCH_CERTIFICATES } from '../actions/action_types.js'


export function certificateReducer(state = [], action) {
	switch(action.type){
		case FETCH_CERTIFICATES :
			return action.payload
		default:
			return state
	}

}

