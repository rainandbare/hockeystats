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
		console.log(values);
		this.props.addPlayer(values);
		this.props.showForm(false);
	}
	render(){

		const { handleSubmit } = this.props;
		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="firstName"
					label="First Name"
					component={this.renderField}
				/>
				<Field
					name="lastName"
					label="Last Name"
					component={this.renderField}
				/>
				<Field 
					name="birthyear"
					label="Birth Year"
					component={this.renderField}
				/>
				<button type="submit">Add Player</button>
			</form>
			);
	}
}

function validate(values){
	const errors = {};

	if (!values.firstName) {
		errors.firstName = "Enter the players First Name."
	}
	if (!values.lastName) {
		errors.lastName = "Enter the players Last Name."
	}
	if (!values.birthyear) {
		errors.birthyear = "Enter the players Birth Year."
	}

	return errors;

}

export default reduxForm({
	validate,
	form: "AddNewPlayer"
})(
	connect(null, { addPlayer })(AddPlayerForm)
);