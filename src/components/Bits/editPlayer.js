import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editPlayer } from '../../actions/player_actions.js';

import PlayerForm from './playerForm';


class EditPlayerForm extends Component {

	componentDidMount() {
  		this.handleInitialize();
	}
	handleInitialize() {
		const playerData = this.props.players.list[this.props.playerID];
	  	this.props.initialize(playerData);
	}
	onSubmit(values){
		this.props.editPlayer(values, this.props.playerID);
		this.props.actionComplete();
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<div className="editPlayerForm">
				<section className="workarea">
					<h2>Edit any player information and press save</h2>
					<PlayerForm 
						onSubmit={handleSubmit(this.onSubmit.bind(this))}
						headings={this.props.headings}
						buttonLabel="Save"
					/>
					<button onClick={this.props.actionComplete} className="button cancel">Cancel</button>
				</section>
			</div>
			);
	}
}
function validate(values){
	const errors = {};

	if (!values.name) {
		errors.name = "Enter the player's Name. (LastName, FirstName)";
	}
	if (!values.birthCity) {
		errors.birthCity = "Enter the players Birth City.";
	}
	if (!values.birthDate) {
		errors.birthDate = "Enter the players Birth Date.";
	}

	return errors;
}


function mapStateToProps(state){
	return {
		headings: state.headings,
		players: state.players,
		playerID: state.editPlayer.playerID
	}
}


export default reduxForm({
	validate,
	form: "EditPlayer"
})(
	connect(mapStateToProps, { editPlayer })(EditPlayerForm)
);
