import { ADD_PLAYER } from '../actions/action_types.js'


const initialState = {
						"348239847293847": {name: "Belinda Berthins"},
						"454354243542435": {name: "Orwell Rights"},
						"454394243542435": {name: "Mary Merry"},
					}


export function playerReducer(state = initialState, action) {
	switch(action.type){
		case ADD_PLAYER:
			const newState = {
				...state
			}
			newState[action.id] = {"name": action.name}
			console.log(newState)

			return newState
		default:
			return state
	}

}

