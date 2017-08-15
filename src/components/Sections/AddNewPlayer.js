import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';
import PlayerForm from '../Bits/playerForm';


class AddPlayerForm extends Component {
	onSubmit(values){
		this.props.addPlayer(values);
		this.props.showForm(false);
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<PlayerForm 
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
				headings={this.props.headings}
				buttonLabel="Add Player"
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
		headings: state.headings
	}
}


export default reduxForm({
	validate,
	form: "AddNewPlayer"
})(
	connect(mapStateToProps, { addPlayer })(AddPlayerForm)
);