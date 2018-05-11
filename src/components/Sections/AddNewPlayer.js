import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { addPlayer, fetchPlayers } from '../../actions/player_actions.js';
import PlayerForm from '../Bits/playerForm';


let playerNames = [];

class AddPlayerForm extends Component {
  	componentWillMount(){
  		this.props.fetchPlayers();
		playerNames = this.props.players.list.map(player => player.name);
  	}
	onSubmit(values){
		values.age = '';
		//if player is deceased then 
		//get the age of the player 
		//and input it into the values array

		// const newPlayer = {};
		// const headings = this.props.headings
		// const headingsKeys = Object.keys(headings);
		// headingsKeys.map((headingKey) => {
		// 	if(values[headings[headingKey].name]){
		// 		newPlayer[headings[headingKey].name] = values[headings[headingKey].name];
		// 	} else {
		// 		newPlayer[headings[headingKey].name] = '';
		// 	}
		// 	return newPlayer;
		// })
		// console.log(values)

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

	if(playerNames.indexOf(values.name) !== -1){
		errors.name = "There is already a player by that name - please add an initial or a number.";
	}

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
		headings: state.headings,
		players: state.players
	}
}


export default reduxForm({
	validate,
	form: "AddNewPlayer"
})(
	connect(mapStateToProps, { addPlayer, fetchPlayers })(AddPlayerForm)
);