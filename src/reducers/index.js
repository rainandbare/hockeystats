import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { playerReducer } from './player_reducer';

const rootReducer = combineReducers({
   players: playerReducer,
   form: formReducer
});

export default rootReducer;
