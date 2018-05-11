import { EDIT_FORM, EDIT_INPROGRESS_FORM } from '../actions/action_types.js'


export function editReducer(state = { showPlayerEdit: false, playerID: '', formType: null}, action) {
	switch(action.type){
		case EDIT_FORM:
			const newState = state;
			newState.showPlayerEdit = true;
			newState.playerID = action.payload;
			return newState;
		case EDIT_INPROGRESS_FORM:
			const newInProgressState = state;
			newInProgressState.showPlayerEdit = true;
			newInProgressState.playerID = action.payload.playerID;
			newInProgressState.formType = action.payload.formType;
			return newInProgressState;
		default:
			return state
	}

}

