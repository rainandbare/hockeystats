import React, { Component } from 'react';

import Title from './title.js';
import PlayerList from './playerList.js';


class SelectedResults extends Component {
	render() {
	    return (
	      <div className="selectedresults results page">
	      	<Title />
	      	<div>Selected Results!</div>
	      	<PlayerList/>
	      </div>
	    );
	}
}

export default SelectedResults;
