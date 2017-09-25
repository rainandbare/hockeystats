import { EDIT_FORM } from './action_types';

export function editForm(playerID){
	return {
		type: EDIT_FORM,
		payload: playerID
	};
}