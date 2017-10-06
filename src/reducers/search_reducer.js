import { UPDATE_SEARCH } from '../actions/action_types';

export function searchReducer(state = {}, action) {
	switch(action.type){
		case UPDATE_SEARCH:
			return action.payload
		default:
			return state
	}

}
