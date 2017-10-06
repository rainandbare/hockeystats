import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editPlayer, deletePlayer } from '../../actions/player_actions.js';

import PlayerForm from './playerForm';
import ManageCertificates from '../Sections/ManageCertificates';


class EditPlayerForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			addCertificate : false,
			removeCertificate: false
		}
		this.onAddCertificate = this.onAddCertificate.bind(this);
	}
	componentDidMount() {
  		this.handleInitialize();
	}
	handleInitialize() {
		const playerData = this.props.players.list[this.props.playerID];
	  	this.props.initialize(playerData);
	}
	onSubmit(values){
		this.props.editPlayer(values, this.props.playerID);
		this.props.actionComplete();
	}
	onDelete(){
		const result = confirm("Delete Player?");
		if (result) {
			this.props.deletePlayer(this.props.playerID);
			this.props.actionComplete();
		}
	}
	onAddCertificate(){
		this.setState ({
			addCertificate : true
		});
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<div className="editPlayerForm">
				<section className="workarea">
					<div className="certificateControls">
					{
						this.state.addCertificate
						? 
						<ManageCertificates
							playerID={this.props.playerID} 
							actionComplete={this.props.actionComplete}/> 
						: 
						<button 
							className="button addCertificate" 
							onClick={this.onAddCertificate}>Manage Certificates</button>
					}
					</div>
					<h2>Edit any player information and press save</h2>
					<PlayerForm 
						onSubmit={handleSubmit(this.onSubmit.bind(this))}
						headings={this.props.headings}
						buttonLabel="Save"
					/>
					<button onClick={this.onDelete.bind(this)} className="button redText">Delete Player</button>
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
		playerID: state.editPlayer.playerID
	}
}


export default reduxForm({
	validate,
	form: "EditPlayer"
})(
	connect(mapStateToProps, { editPlayer, deletePlayer })(EditPlayerForm)
);
