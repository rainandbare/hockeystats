import { EDIT_FORM, EDIT_INPROGRESS_FORM } from './action_types';

export function editForm(playerID){
	return {
		type: EDIT_FORM,
		payload: playerID
	};
}

export function editInProgressForm(info){
	return {
		type: EDIT_INPROGRESS_FORM,
		payload: info
	};
}