import { EDIT_FORM } from '../actions/action_types.js'


export function editReducer(state = { showPlayerEdit: false, playerID: ''}, action) {
	switch(action.type){
		case EDIT_FORM:
			const newState = state;
			newState.showPlayerEdit = true;
			newState.playerID = action.payload;
			console.log(newState, 'from EDIT REDUCER');
			return newState;
		default:
			return state
	}

}

