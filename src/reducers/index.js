import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { playerReducer } from './player_reducer';
import { headingReducer } from './headings_reducer';
import { buttonsReducer } from './buttons_reducer';
import { editReducer } from './edit_reducer';
import { certificateReducer } from './certificate_reducer.js';
import { searchReducer } from './search_reducer.js';

const rootReducer = combineReducers({
   players: playerReducer,
   form: formReducer,
   headings: headingReducer,
   buttons: buttonsReducer,
   certificates: certificateReducer,
   searchTerm: searchReducer, 
   editPlayer: editReducer
});

export default rootReducer;
