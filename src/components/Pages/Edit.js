import React, { Component } from 'react';
import { connect } from 'react-redux';


import Title from '../Bits/title.js';
import Table from '../Sections/EditList.js';
import QuerySelector from '../Sections/QuerySelector.js';
import DeathAverage from '../Bits/deathAverage.js';
import WorkArea from '../Sections/WorkArea.js';

import { fetchHeadings } from '../../actions/heading_actions.js';


class Results extends Component {
	constructor(props){
		super(props);
		this.state = {
			deathPage : false,
			categories: ["all"],
			actionType: null
		}


		this.findPathName = this.findPathName.bind(this);
		this.chooseAction = this.chooseAction.bind(this)
		this.actionComplete = this.actionComplete.bind(this)

	}
	componentWillMount(){
		this.findPathName(location.pathname);
	}
	findPathName(path){
		if (path.includes('results')) {
			//find out what categories the user requested
			const splitPath = path.split('/results/');
			splitPath.shift();
			const categories = splitPath[0].split('-');

			//find out if it is just the Death Info category
			let deathPage = false;
			if((categories.length === 1) && (categories.findIndex(isDeathInfo) !== -1)){
				deathPage = true;
			}

			//set state to pass info to render method
			this.setState({ 
				categories : categories,
				deathPage : deathPage 
			})
		}
		function isDeathInfo(element){
			return element === 'deathInfo';
		}
	}
	chooseAction(e){

		this.setState({
			actionType : e.target.id
		});
	}
	actionComplete(){
		this.setState({
			actionType: null,
		})
	}

	render() {
		console.log(this.state.actionType)
	    return (
	      	<div className="selectedresults edit results page">
	      		<section className="topOPage flexMe">
			      	<Title/>
			      	<div className="editDeclaration">
			      		EDIT
			      	</div>
		      	</section>
		      	<section className="selectAction flexMe">
		      		<button className="actionType button" id="addPlayer" onClick={this.chooseAction}>Add a Player</button>
		      		<button className="actionType button" id="addColumn" onClick={this.chooseAction}>Add a Column</button>
		      		<button className="actionType button" id="addCertificate"onClick={this.chooseAction}>Add a Certificate</button>
		      		<button className="actionType button" id="editButton" onClick={this.chooseAction}>Edit Buttons</button>
			    </section>
			    <WorkArea action={this.state.actionType} actionComplete={this.actionComplete}/>
		      	<h2>Edit A Player</h2>
	      		<Table 
	      			categories={this.state.categories}
	      	 		deathPage={this.state.deathPage}/>
	      	</div>
	    );
	}
}

export default connect(null, { fetchHeadings })(Results);
