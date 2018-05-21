import React, { Component } from 'react';
import './thanks.css';
import InProgressTable from '../Sections/InProgressTable';

class Thanks extends Component {
	nothingHappens(){}
	render() {
	  	return (
		    <div className="intro page clearfix">
		    	<h1>THANKS</h1>
					<p>No man is an island, and no man can attempt to find obituaries for each and every deceased NHLer without help. Herewith is a list of those librarians and archivists, historians and microfilm rats, friends and colleagues, who took time to help track down some often very obscure players. This site is the better for your passion and expertise. Grazie!</p>				
					<InProgressTable 
			      		type={"thanks"}
			      		openEditForm = {this.nothingHappens} />
			</div>
	    );
	}
}


export default Thanks;
