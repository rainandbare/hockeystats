import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/player_actions.js';
import AddPlayerForm from './Results/addNewPlayer.js';
import _ from 'lodash';


class Edit extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
		}
	}
	
	render() {
		const players = this.props.players;
		const keys = Object.keys(this.props.players);
	    return (
	      <div className="edit">
	      	EDIT
	      	<AddPlayerForm />
	      	<h3>Players </h3>
	      	<ul>
	      		{keys.map((index) => {
                return (
                  <li key={index}>
                    {players[index].firstName} {players[index].lastName}
                  </li>
                );
              })}
	      	</ul>
	      </div>
	    );
	}
}

function mapStateToProps(state){
	return {
		players: state.players
	}
}


export default connect(mapStateToProps, { addPlayer })(Edit);
