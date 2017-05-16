import { combineReducers } from 'redux';
import { playerReducer } from './player_reducer';

const rootReducer = combineReducers({
   players: playerReducer
});

export default rootReducer;
