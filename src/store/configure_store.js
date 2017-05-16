import rootReducer from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export default (rootReducer) => {
  return createStore(rootReducer, 
  	{},
  	applyMiddleware(thunk));
};
