import React, { Component } from 'react';
import { Field } from 'redux-form';


class PlayerForm extends Component {
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
		const headings = this.props.headings;
		const headingsKeys = Object.keys(this.props.headings); 
		return(
			<form onSubmit={this.props.onSubmit}>
			{headingsKeys.map((a) => {
				//console.log(headings[a].name)
				return (
				<Field
					key={headings[a].name}
					name={headings[a].name}
					label={headings[a].label}
					component={this.renderField}
				/>
				);
			})}
				<button className="button" type="submit">{this.props.buttonLabel}</button>
			</form>
			);
	}
}

export default PlayerForm;

