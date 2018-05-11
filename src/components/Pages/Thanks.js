import React, { Component } from 'react';
import './thanks.css';
import InProgressTable from '../Sections/InProgressTable';

class Thanks extends Component {
	nothingHappens(){}
	render() {
	  	return (
		    <div className="intro page clearfix">
		    	<h1>THANKS</h1>
					<p>No man is an island, and no man can attempt to find obituaries for each and every deceased NHLer without plenty of help. Herewith is a list of those librarians and archivists, friends and colleagues, who took time to help track down some often very obscure players. This site is the better for your skills and willingness to help. Grazie!</p>				
					<InProgressTable 
			      		type={"thanks"}
			      		openEditForm = {this.nothingHappens} />
			</div>
	    );
	}
}


export default Thanks;
