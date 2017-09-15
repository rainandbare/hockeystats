import React, { Component } from 'react';

import Title from '../Bits/title.js';
import MyTable from '../Sections/PlayerList3.js';


class TrialResults extends Component {
	render() {
	    return (
	      	<div className="selectedresults results page">
		      	<Title />
	      		<MyTable />
	      	</div>
	    );
	}
}

export default TrialResults;
