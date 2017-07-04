import React, { Component } from 'react';
import { Field } from 'redux-form';
//import { connect } from 'react-redux';
//import { addPlayer } from '../../actions/player_actions.js';
// import { fetchHeadings } from '../actions/heading_actions.js';

class PlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		console.log(field.playerID, "plaeyer ID from Player form Render field");
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
		return(
			<form onSubmit={this.props.onSubmit}>
			{this.props.headings.map((a) => {
				return (
				<Field
					key={a.name}
					name={a.name}
					label={a.label}
					component={this.renderField}
					playerID={this.props.playerID}
				/>
				);
			})}
				<button type="submit">Add Player</button>
			</form>
			);
	}
}

export default PlayerForm;

