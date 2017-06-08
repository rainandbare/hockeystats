import React, { Component } from 'react';

import Title from './title.js';
import PlayerList from './playerList.js';


class Results extends Component {
	render() {
	    return (
	      <div className="results">
	      	<Title />
	      	<PlayerList/>
	      </div>
	    );
	}
}

export default Results;
