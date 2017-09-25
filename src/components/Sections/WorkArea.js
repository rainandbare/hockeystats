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
					<AddNewPlayer actionComplete={this.props.actionComplete} />
				</section>
			);
		case "addColumn":
			return(
				<section className="workarea">
					<AddNewColumn actionComplete={this.props.actionComplete}/>
				</section>
			);
		case "editButton":
			return(
				<section className="workarea">
					<EditButtons actionComplete={this.props.actionComplete}/>
				</section>
			);
		case "addCertificate":
			return(
				<section className="workarea">
					<AddNewCertificate actionComplete={this.props.actionComplete}/>
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