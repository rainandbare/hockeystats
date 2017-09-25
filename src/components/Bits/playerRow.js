import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';
import slug from '../../functions/slug.js'

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

class PlayerRow extends Component {
	render(){
		const players = this.props.players;
		const index = this.props.index;
		const certificates = this.props.certificates;
		let hasBirthCert, hasDeathCert;


		if (certificates.birth){
			hasBirthCert = Object.keys(certificates.birth);		
		}
		if (certificates.death){
			hasDeathCert = Object.keys(certificates.death);		
		}
		const nameSlug = slug(players[index].name);


		return(
				<Row key={"row" + index} className={players[index].nameSlug}>
                    {
                    	this.props.rowHeadingsFinal.map((a) => {
	                     		const content = players[index][a.name];
	                    		return(
	                     			<Cell className={a.name} key={a.name + index}>
							        {
							        	reactStringReplace(content, this.props.searchTerm, (match, i) => (
							          		<span key={i} className="search-highlight">{match}</span>
							        	))
							        }
	                     			</Cell>
	                     		);	
	                    	//}
	                	})
                	} 
                    { this.props.edit ? <Cell><button id={index} onClick={this.props.onDeletePlayer}>Delete Player</button><button id={index} onClick={this.props.onToggleEditForm}>Edit Player</button></Cell> : <Cell></Cell>}
			    </Row>
		);
	}
}

export default PlayerRow;