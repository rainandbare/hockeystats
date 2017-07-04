import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { playerReducer } from './player_reducer';
import { headingReducer } from './headings_reducer';
import { buttonsReducer } from './buttons_reducer'

const rootReducer = combineReducers({
   players: playerReducer,
   form: formReducer,
   headings: headingReducer,
   buttons: buttonsReducer
});

export default rootReducer;
