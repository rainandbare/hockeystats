import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import database from './database.js';
import Header from './components/Sections/Header';
import Footer from './components/Sections/Footer';
import Home from './components/Pages/Home';
import Results from './components/Pages/Results';
import Intro from './components/Pages/Intro';
import SelectedResults from './components/Pages/SelectedResults';
import Edit from './components/Pages/Edit';
;import './index.css';

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
						<Route path="/selected/*" component={ SelectedResults } />
						<Route path="/edit" component={ Edit } />
						<Route path="/results" component={ Results } />
						<Route path="/intro" component={ Intro }/>
						<Route path="/" component={ Home } />
					</Switch>
				</main>
				<Footer />
			</div>
	  	</BrowserRouter>
  	</Provider>
  ,
  document.getElementById('root')
);
