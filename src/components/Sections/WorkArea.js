import React, { Component } from 'react';
import AddNewPlayer from '../Sections/AddNewPlayer.js';
import AddNewCertificate from '../Sections/AddNewCertificate.js';
import EditButtons from '../Sections/EditButtons.js';
import AddNewColumn from '../Sections/AddNewColumn.js';

import './workArea.css'

class WorkArea extends Component {
	render(){

		switch(this.props.action){
		case "addPlayer":
			return(
				<section className="workarea">
					<AddNewPlayer />
				</section>
			);
		case "addColumn":
			return(
				<section className="workarea">
					<AddNewColumn />
				</section>
			);
		case "editButton":
			return(
				<section className="workarea">
					<EditButtons />
				</section>
			);
		case "addCertificate":
			return(
				<section className="workarea">
					<AddNewCertificate />
				</section>
			);
		default:
			return(
				<section>
				</section>
			);
	}

		
	}
}

export default WorkArea;