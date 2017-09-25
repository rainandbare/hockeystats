import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import slug from '../../functions/slug.js';



import { addHeading } from '../../actions/heading_actions.js';

class AddNewCertificate extends Component {
	onSubmit(values){
		console.log(values)
		// const label = values.columnName;
		// const name = slug(label);
		// const heading = {
		// 	name,
		// 	label
		// }
		// this.props.addHeading(heading);
	}
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className} key={field.key}>
				<label>{field.label}: </label>
				<input 
					id={field.name}
					type={field.type}
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
				AddNewCertificate
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					key="name"
					name="name"
					label="Player Name"
					type="text"
					component={this.renderField}
				/>
				<label htmlFor="type">Type</label>
				<Field name="type" id="type" component="select">
		            <option />
		            <option value="ff0000">Birth</option>
		            <option value="00ff00">Death</option>
		          </Field>
				<Field
					key="file"
					name="file"
					label="Choose Your File"
					type="file"
					component={this.renderField}
				/>
				<input
  type="file"
  onChange={
    ( e ) => {      
      e.preventDefault();
      const { fields } = this.props;
      // convert files to an array
      const files = [ ...e.target.files ];
      fields.yourField.handleChange(files);
    }
  }
/>
				<button className="button" type="submit">Add Certificate</button>
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
	form: "AddNewCertificate"
})(
	connect(null, { addHeading })(AddNewCertificate)
);