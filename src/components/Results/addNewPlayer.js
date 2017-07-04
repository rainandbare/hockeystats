import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';
// import { fetchHeadings } from '../actions/heading_actions.js';

class AddPlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className} key={field.key}>
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
		const headings = this.props.headings;
		console.log(headings, "from ADD NEW PLAYER")
		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			{headings.map((a) => {
				return (
				<Field
					key={a.name}
					name={a.name}
					label={a.label}
					component={this.renderField}
				/>
				);
			})}
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