import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayers, deletePlayer, editPlayer } from '../actions/player_actions.js';
import { fetchHeadings } from '../actions/heading_actions.js';
import EditPlayerForm from './Results/editPlayer';


class PlayerList extends Component {
		constructor(props){
		super(props);
		this.state = {
			name: '',
			showEditForm: false,
			editPlayerID: ''
		}
	}
	componentDidMount(){
		this.props.fetchPlayers();
		this.props.fetchHeadings();
	}
	onDeletePlayer(e){
		this.props.deletePlayer(e.target.id)
	}
	onEditPlayer(e){
		const info = {
						name: "Joe Dimajio",
						age: 12,
					};
		this.props.editPlayer(e.target.id, info)
		console.log("edit this player");
	}
	onToggleEditForm(e){
		this.setState({
			showEditForm: true,
			editPlayerID: e.target.id
		})
	}
	render(){
		console.log(this.props)
		const players = this.props.players;
		const keys = Object.keys(this.props.players);
		const rowHeadings = Object.values(this.props.headings);
		//const rowHeadingsName = rowHeadingsArray.map(function(a) {return a.name;});
		//const rowHeadingsLabel = rowHeadingsArray.map(function(a){return a.label})
		return(
			<div className="playerList">
				<table>
					<thead>
						<tr>
							<th>
							Name
							</th>
						</tr>
					</thead>
					<tbody>
						{keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>
			                    {rowHeadings.map((a) => {
			                    	if(a.name === rowHeadings[0].name){
			                    		return(
			                     			<th key={a.name + index}>{players[index][a.name]}</th>
			                     		);
			                    	}
			                	})} 
			                </tr>
			                );
			              })}
					</tbody>
				</table>
		      	<table className="scrollableTable">
		      		<div className="overlay">
		      		<thead>
		      			<tr>
		      			{rowHeadings.map((a) => {
		      				if(a.name === rowHeadings[0].name){
								return;
			                }
			                return(
		      					<th key={a.name} id={a.name}>{a.label}</th>
		      				);
		      			})}
		      			</tr>
		      		</thead>
		      		<tbody>
		      			{keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>
			                  {console.log(rowHeadings[0].name)}
			                    {rowHeadings.map((a) => {
			                    	if(a.name === rowHeadings[0].name){
										return;
			                    	}
			                     return(
			                     		<td key={a.name + index}>{players[index][a.name]}</td>
			                     	);
			                   
			                	})} 
			                    <td>{this.props.edit ? <button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button> : ""}</td>
			                    <td>{this.props.edit ? <button id={index} onClick={this.onToggleEditForm.bind(this)}>Edit Player</button> : ""}</td>
			                  </tr>
			                );
			              })}
		      		</tbody>
		      		</div>
		      	</table>
		      	  {this.state.showEditForm ? <EditPlayerForm playerID={this.state.editPlayerID}/> : ""}
	      	</div>
		);
	}
}

function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings
	}
}


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings })(PlayerList);