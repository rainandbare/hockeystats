import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import { ResizableBox } from 'react-resizable';

import slug from '../../functions/slug.js';



import { addHeading } from '../../actions/heading_actions.js';

class AddNewColumn extends Component {
	constructor(props){
		super(props);
		this.recordWidth = this.recordWidth.bind(this);


	}
	onSubmit(values){
		const label = values.columnName;
		const name = slug(label);
		const width = values.width
		const heading = {
			name,
			label,
			width
		}
		this.props.addHeading(heading);
	}
	recordWidth(e, data){
		console.log(Math.round(data.size.width))
		this.props.change("AddNewColumn", "width", Math.round(data.size.width))
		//console.log(this.props)
	}
	renderField(field){
		const className = `formfield ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
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
			<div className="addNewColumn">
				<h2>Fill in column title and resize header to choose default width.</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<div className="columnNameField">
						<ResizableBox width={150} height={48} axis={'x'} minConstraints={[42, 45]} onResizeStop={this.recordWidth}>
							<Field
								key="columnName"
								name="columnName"
								label="Name"
								component={this.renderField}
							/>
						</ResizableBox>

						</div>
						

				<Field
					key="width"
					name="width"
					label="Width"
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
	initialValues:{ width: 150 },
	form: "AddNewColumn"
})(
	connect(null, { addHeading, change })(AddNewColumn)
);

