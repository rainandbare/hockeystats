import React, { Component } from 'react';


class PlayerNames extends Component {
	render(){
		return(
			<div>
				<table>
					<thead>
						<tr>
							<th>
							Name
							</th>
						</tr>
					</thead>
					<tbody>
						{
						//for every player in the list	
						this.props.keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>

			                    {
			                    //if the rowHeading is === to Name
			                    this.props.rowHeadings.map((a) => {
			                    	if(a.name === this.props.rowHeadings[0].name){

			                    		return(
			                     			<th key={a.name + index}>{this.props.players[index][a.name]}</th>
			                     		);
			                    	} else { 
			                    		return <div key={a.name + index}></div>
			                    	};
			                	})} 
			                </tr>
			                );
			              })}
					</tbody>
				</table>
			</div>
		);
	}
}

export default PlayerNames;