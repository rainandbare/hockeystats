import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import slug from '../../functions/slug.js';



import { addHeading } from '../../actions/heading_actions.js';

class AddNewColumn extends Component {
	onSubmit(values){
		const label = values.columnName;
		const name = slug(label);
		const heading = {
			name,
			label
		}
		this.props.addHeading(heading);
	}
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
	render(){
		const { handleSubmit } = this.props;
		return(
			<div>
				AddNewColumn
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					key="columnName"
					name="columnName"
					label="Name"
					component={this.renderField}
				/>
				<button className="button" type="submit">Add Column</button>
				</form>
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

export default reduxForm({
	validate,
	form: "AddNewColumn"
})(
	connect(null, { addHeading })(AddNewColumn)
);

