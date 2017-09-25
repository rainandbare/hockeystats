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
		console.log(values);
		this.props.editPlayer(values, this.props.playerID);
		this.props.hideForm();
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<PlayerForm 
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
				headings={this.props.headings}
				buttonLabel="Edit Player"
			/>

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
