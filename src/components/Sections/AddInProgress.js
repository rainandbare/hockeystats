import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import { addInProgress, fetchInProgress } from '../../actions/inprogress_action.js';
import PlayerForm from '../Bits/playerForm';



class AddInProgress extends Component {
	componentWillMount(){
	  	this.props.fetchInProgress();
	}
	onSubmit(values){
		console.log(values, this.props.type);
		this.props.addInProgress(values, this.props.type);
		this.props.actionComplete();
	}

	render(){
		if(this.props.open){
			const { handleSubmit } = this.props;
			const type = this.props.type;
			if(this.props.inProgress[type].headings){
				return(
					<section className="workarea" id={this.props.type}>
						<div className="addNewPlayer">
							<h2>Fill out the form to add a new In Progress Entry.</h2>
							<PlayerForm 
								onSubmit={handleSubmit(this.onSubmit.bind(this))}
								headings={this.props.inProgress[type].headings}
								buttonLabel="Add Entry"
							/>
							<button onClick={this.props.actionComplete} className="button cancel">Cancel</button>
						</div>
					</section>
				)
			} else {return(<div />)	}
		} else {return(<div />) }
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
		headings: state.headings,
		inProgress: state.inProgress,
	}
}


export default reduxForm({
	validate,
	form: "AddNewInProgressEntry"
})(
	connect(mapStateToProps, { addInProgress, fetchInProgress })(AddInProgress)
);