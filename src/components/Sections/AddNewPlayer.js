import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';
import PlayerForm from '../Bits/playerForm';



class AddPlayerForm extends Component {
	onSubmit(values){
		if(values.nickName === ''){
			values.name = values.lastName + ', ' + values.firstName
		} else {
			values.name = values.lastName + ', ' + values.firstName + ' "' + values.nickName + '"'
		}

		const newPlayer = {};
		const headings = this.props.headings
		const headingsKeys = Object.keys(headings);

		headingsKeys.map((headingKey) => {
			if(values[headings[headingKey].name]){
				newPlayer[headings[headingKey].name] = values[headings[headingKey].name];
			} else {
				newPlayer[headings[headingKey].name] = '';
			}
			return newPlayer;
		})

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
				<button onClick={this.props.actionComplete} className="button cancel">Cancel</button>
			</div>
			);
	}
}

function validate(values){
	const errors = {};


	if (!values.status) {
		errors.status = "Choose player's status.";
	}
	if (!values.position) {
		errors.position = "Enter player's position";
	}
	if(!values.birthCity){
		errors.birthCity = "Enter player's Birth City";
	}
	if(!values.birthCountry){
		errors.birthCountry = "Enter player's Birth Country";
	}
	if(values.nickName){
		if(values.nickName.indexOf('"') !== -1 || values.nickName.indexOf("'") !== -1 ){
			errors.nickName = "Enter nickname without quotes";
		}
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