import { UPDATE_SEARCH } from './action_types';

export function updateSearch(searchTerm){
		return {
			type: UPDATE_SEARCH,
			payload: searchTerm
		}
}