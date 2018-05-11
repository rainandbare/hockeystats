import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import database from './database.js';
import Header from './components/Sections/Header';
import Footer from './components/Sections/Footer';
import Home from './components/Pages/Home';
import Intro from './components/Pages/Intro';
import Placeholder from './components/Pages/Placeholder';
import Login from './components/Pages/Login';
import Thanks from './components/Pages/Thanks';
import InProgress from './components/Pages/InProgress';


import Results from './components/Pages/Results.js';
import Edit from './components/Pages/Edit';
import './index.css';

import {Provider} from 'react-redux';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Header />
				<main>
					<Switch>
						<Route path="/results/*" component={ Results } />
						<Route exact path="/results" render={() => (<Redirect to="/results/all"/>)}/>
						<Route path="/edit" component={ Edit } />
						<Route path="/intro" component={ Intro }/>
						<Route path="/home" component={ Home } />
						<Route path='/login' component={ Login } />
						<Route path='/in-progress' component={ InProgress } />
						<Route path='/thanks' component={ Thanks } />
						<Route path="/" component={ Placeholder } />
					</Switch>
				</main>
				<Footer />
			</div>
	  	</BrowserRouter>
  	</Provider>
  ,
  document.getElementById('root')
);
