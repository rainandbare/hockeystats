import React, { Component } from 'react';
import AddNewPlayer from '../Sections/AddNewPlayer.js';
import EditButtons from '../Sections/EditButtons.js';
import AddNewColumn from '../Sections/AddNewColumn.js';

import './workArea.css'

class WorkArea extends Component {
	render(){
		switch(this.props.action){
		case "addPlayer":
			return(
				<section className="workarea">
					<AddNewPlayer playersNames={this.props.playersNames} actionComplete={this.props.actionComplete} />
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
		default:
			return(
				<section>
				</section>
			);
		}
	}
}

export default WorkArea;