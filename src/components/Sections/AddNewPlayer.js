import React, { Component } from 'react';
import { reduxForm, resetForm } from 'redux-form';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';
import PlayerForm from '../Bits/playerForm';



class AddPlayerForm extends Component {
	onSubmit(values){
		this.props.addPlayer(values);
		this.props.actionComplete();
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<div className="addNewPlayer">
				<h2>Fill out the form to add a new player.</h2>
				<PlayerForm 
					onSubmit={handleSubmit(this.onSubmit.bind(this))}
					headings={this.props.headings}
					buttonLabel="Add Player"
				/>
			</div>
			);
	}
}

function validate(values){
	const errors = {};


	if (!values.name) {
		errors.name = "Enter player's name. (LastName, FirstName)";
	}
	if (!values.status) {
		errors.name = "Choose player's status.";
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