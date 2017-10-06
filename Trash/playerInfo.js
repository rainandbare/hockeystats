import React, { Component } from 'react';


class PlayerInfo extends Component {
	

	render(){
		if(this.props.rowHeadingsFinal){
			const rowHeadingsFinal = this.props.rowHeadingsFinal;
		}
		return(
			<div>
				<table className="scrollableTable">
		      		<span className="overlay">
		      		<thead>
		      			<tr>
						{
		      			//this.props.rowHeadingsFinal.map((a) => {
		      // 				if(a.name === this.props.rowHeadings[0].name){
								// return(<th key={a}></th>);
			     //            } 
			     //            return(
		      // 					<th key={a.name} id={a.name}>{a.label}</th>
		      // 				);
		      			//})
		      			}
		      			</tr>
		      		</thead>
		      		<tbody>
		      		 	{//this.props.keys.map((index) => {
			       //          return (
			       //            <tr key={"row" + index}>
			       //              {this.props.rowHeadingsFinal.map((a) => {
			       //              	if(a.name === this.props.rowHeadings[0].name){
										// return(<th key={a}></th>);
			       //              	}
			       //               return(
			       //               		<td key={a.name + index}>{this.props.players[index][a.name]}</td>
			       //               	);
			                   
			       //          	})} 
			       //              <td>{this.props.edit ? <button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button> : ""}</td>
			       //              <td>{this.props.edit ? <button id={index} onClick={this.onToggleEditForm.bind(this)}>Edit Player</button> : ""}</td>
			       //            </tr>
			       //          );
			       //        })
			   }
		      		</tbody>
		      		</span>
		      	</table>
			</div>
		);
	}
}

export default PlayerInfo;