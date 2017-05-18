import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer, fetchPlayers, deletePlayer } from '../actions/player_actions.js';
import AddPlayerForm from './Results/addNewPlayer.js';
import _ from 'lodash';


class Results extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			showForm: false,
		}
	}
	componentDidMount(){
		this.props.fetchPlayers();
	}
	onDeletePlayer(e){
		this.props.deletePlayer(e.target.id)
	}
	onToggleForm(value){
		this.setState({
			showForm: value,
		})
	}
	render() {
		const players = this.props.players;
		const keys = Object.keys(this.props.players);
		console.log(this.props.players);
	    return (
	      <div className="results">
	      	Results	
	      	<div className="playerList">
		      	<h3>Players</h3>

		      	<ul>
		      		{keys.map((index) => {
	                return (
	                  <li key={index}>
	                    {players[index].firstName} {players[index].lastName}
	                    <button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button>
	                  </li>
	                );
	              })}
		      	</ul>
	      	</div>
	      	{this.state.showForm ? <AddPlayerForm showForm={this.onToggleForm.bind(this)}/> : <button onClick={() => this.onToggleForm(true)}>+</button>}
	      </div>
	    );
	}
}

function mapStateToProps(state){
	return {
		players: state.players
	}
}


export default connect(mapStateToProps, { addPlayer, fetchPlayers, deletePlayer })(Results);
