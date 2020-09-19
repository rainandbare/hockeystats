import { LOADING } from './action_types';

	
export function isLoading() {
			return dispatch => dispatch({
				type: LOADING,
				payload: true
			})
	}




