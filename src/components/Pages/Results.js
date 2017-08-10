import React, { Component } from 'react';

import Title from '../Bits/title.js';
import PlayerList from '../Sections/PlayerList.js';


class Results extends Component {
	render() {
	    return (
	      <div className="results page">
	      	<Title />
	      	<PlayerList/>
	      </div>
	    );
	}
}

export default Results;
