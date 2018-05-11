import React, { Component } from 'react';
import './inProgress.css';
import InProgressTable from '../Sections/InProgressTable';


class InProgress extends Component {
	constructor(props){
	  	super(props);
	  	this.nothingHappens = this.nothingHappens.bind(this);
	}
	nothingHappens(){
		//nothing happens here
	}
	render() {
		    return (
		      <div className="intro page clearfix">
		      	<h1><span className='i'>I</span>N <span className="space"> </span>PROGRESS</h1>
		      	<h2>Get</h2>
		      	<p>There is known obituary or death notice information for these players:</p>
		      	<InProgressTable 
		      		type={"get"}
		      		openEditForm = {this.nothingHappens} />
		      	<h2>Find</h2>
				<p>Obituary or death notice information for these players has not yet been confirmed:</p>
				<InProgressTable 
					type={"find"}
					openEditForm = {this.nothingHappens} />
		      </div>
		    );
	}
}


export default InProgress;