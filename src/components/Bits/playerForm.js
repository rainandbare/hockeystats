import React, { Component } from 'react';
import { Field } from 'redux-form';

import './playerForm.css'

class PlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className} key={field.key}>
				<label>{field.label}: </label>
				<input 
					id={field.name}
					type={field.type}
					placeholder={field.placeholder}
					{...field.input}
				/>
				<div className="red-text">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
		
	}
	renderSelectField(field){

		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(

			<div className={className} key={field.key}>
				<label>{field.label}: </label>
				<input 
					id={field.name}
					type="select"
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
				if(headings[a].name === 'name' && this.props.buttonLabel === "Add Player"){
					return (
					<div key="name">	
						<Field
							key="firstName"
							name="firstName"
							label="First Name"
							type="text"
							component={this.renderField}
						/>
						<Field
							key="lastName"
							name="lastName"
							label="Last Name"
							type="text"
							component={this.renderField}
						/>
						<Field
							key="nickName"
							name="nickName"
							label="Nick Name"
							type="text"
							placeholder="optional"
							component={this.renderField}
						/>
					</div>
					);
				} else {
					return (
					<Field
						key={headings[a].name}
						name={headings[a].name}
						label={headings[a].label}
						type={headings[a].type}
						component={this.renderField}
					/>
					);
				}
			})}
				<button className="button" type="submit">{this.props.buttonLabel}</button>
			</form>
			);
	}
}

export default PlayerForm;

