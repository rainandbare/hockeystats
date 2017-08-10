import React, { Component } from 'react';

import Title from '../Bits/title.js';
import PlayerList from '../Sections/PlayerList.js';


class SelectedResults extends Component {
	render() {
	    return (
	      <div className="selectedresults results page">
	      	<Title />
	      	<PlayerList/>
	      </div>
	    );
	}
}

export default SelectedResults;
