import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js'

class AddPlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className}>
			<label>{field.label}: </label>
				<input 
					
					id={field.name}
					type="text"
					{...field.input}
				/>
				<div className="red-text">
				{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
		
	}
	onSubmit(values){
		// console.log(values);
		this.props.addPlayer(values);
		this.props.showForm(false);
	}
	render(){

		const { handleSubmit } = this.props;
		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="name"
					label="Name"
					component={this.renderField}
				/>
				<Field
					name="birthCity"
					label="Birth City"
					component={this.renderField}
				/>
				<Field 
					name="birthDate"
					label="Birth Date"
					component={this.renderField}
				/>
				<button type="submit">Add Player</button>
			</form>
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

export default reduxForm({
	validate,
	form: "AddNewPlayer"
})(
	connect(null, { addPlayer })(AddPlayerForm)
);