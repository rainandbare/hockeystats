import { LOADING } from '../actions/action_types.js'


export function loadingReducer(state = false, action) {
	switch(action.type){
		case LOADING :
			return action.payload
		default:
			return state
	}

}


