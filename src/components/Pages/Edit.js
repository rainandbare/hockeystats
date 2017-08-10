import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';

import AddPlayerForm from '../Sections/AddNewPlayer';
import QuerySelector from '../Sections/QuerySelector';
import Title from '../Bits/title.js';
import PlayerList from '../Sections/PlayerList';

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
