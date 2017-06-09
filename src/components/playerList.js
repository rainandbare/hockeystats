import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayers, deletePlayer } from '../actions/player_actions.js';
import { fetchHeadings } from '../actions/heading_actions.js';

class PlayerList extends Component {
		constructor(props){
		super(props);
		this.state = {
			name: '',
			showForm: false
		}
	}
	componentDidMount(){
		this.props.fetchPlayers();
		this.props.fetchHeadings();
	}
	onDeletePlayer(e){
		this.props.deletePlayer(e.target.id)
	}
	render(){
		const players = this.props.players;
		const keys = Object.keys(this.props.players);
		const rowHeadings = Object.values(this.props.headings);
		return(
			<div className="playerList">
		      	<table>
		      		<thead>
		      			<tr>
		      			{rowHeadings.map((heading) => <th key={heading}>{heading}</th>)}
		      			</tr>
		      		</thead>
		      		<tbody>
		      			{keys.map((index) => {
			                return (
			                  <tr key={index}>
			                    {rowHeadings.map((heading) => <td key={heading + index}>{players[index][heading]}</td>)} 
			                    <td>{this.props.edit ? <button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button> : ""}</td>
			                  </tr>
			                );
			              })}
		      		</tbody>
		      	</table>
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


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, fetchHeadings })(PlayerList);