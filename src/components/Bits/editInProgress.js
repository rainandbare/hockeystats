import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchInProgress, editInProgress, deleteInProgress } from '../../actions/inprogress_action';

import PlayerForm from './playerForm';



class EditInProgressForm extends Component {
	componentDidMount() {
  		this.handleInitialize();
	}
	handleInitialize() {
		const data = this.props.inProgress[this.props.type].entries[this.props.playerID];
	  	this.props.initialize(data);
	}
	onSubmit(values){
		this.props.editInProgress(this.props.type, values, this.props.playerID);
		this.props.actionComplete();
	}
	onDelete(){
		const result = window.confirm("Delete Entry?");
		if (result) {
			this.props.deleteInProgress(this.props.type, this.props.playerID);
			this.props.actionComplete();
		}
	}
	render(){
		const { handleSubmit } = this.props;
		const type = this.props.type;
		return(
			<div className="editPlayerForm">
				<section className="workarea">
					<h2>Edit any player information and press save</h2>
					<PlayerForm 
						onSubmit={handleSubmit(this.onSubmit.bind(this))}
						headings={this.props.inProgress[type].headings}
						buttonLabel="Save"
					/>
					<button onClick={this.onDelete.bind(this)} className="button redText">Delete Entry</button>
					<button onClick={this.props.actionComplete} className="button cancel">Cancel</button>
				</section>
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


function mapStateToProps(state){
	return {
		headings: state.headings,
		players: state.players,
		playerID: state.editPlayer.playerID,
		type: state.editPlayer.formType,
		inProgress: state.inProgress,
	}
}


export default reduxForm({
	validate,
	form: "EditPlayer"
})(
	connect(mapStateToProps, { fetchInProgress, editInProgress, deleteInProgress })(EditInProgressForm)
);
