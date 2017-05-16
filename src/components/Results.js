import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/player_actions.js';
import _ from 'lodash';


class Results extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	render() {
		const players = this.props.players;
		const keys = Object.keys(this.props.players);
	    return (
	      <div className="results">
	      	Results
	      	<button onClick={() => this.props.addPlayer('Sally Hawkins')}>Add Player</button>
	      	<ul>
	      		{keys.map((index) => {
                return (
                  <li key={index}>
                    {players[index].name}
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


export default connect(mapStateToProps, { addPlayer })(Results);
