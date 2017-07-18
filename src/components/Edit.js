import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/player_actions.js';

import AddPlayerForm from './Results/addNewPlayer';
import QuerySelector from './querySelector';
import Title from './title.js';
import PlayerList from './playerList.js';

import _ from 'lodash';


class Edit extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			showForm: false,
		}
	}
	onToggleForm(value){
		this.setState({
			showForm: value,
		})
	}
	render() {
	    return (
	      <div className="results page">
	      	<Title />
	      	<QuerySelector edit="true" />
	      	<PlayerList edit="true"/>
	      	{this.state.showForm ? <AddPlayerForm showForm={this.onToggleForm.bind(this)}/> : <button onClick={() => this.onToggleForm(true)}>+</button>}
	      </div>
	    );
	}
}

export default connect(null, { addPlayer })(Edit);
