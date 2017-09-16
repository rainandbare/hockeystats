import React, { Component } from 'react';
import { connect } from 'react-redux';


import Title from '../Bits/title.js';
import MyTable from '../Sections/PlayerList3.js';
import QuerySelector from '../Sections/QuerySelector.js';


import { fetchHeadings } from '../../actions/heading_actions.js';

class TrialResults extends Component {
	constructor(props){
		super(props);
		this.state = {
			deathPage : false,
			categories: ["all"]
		}


		this.findPathName = this.findPathName.bind(this)
	}
	componentWillMount(){
		this.findPathName(location.pathname);
	}
	findPathName(path){
		if (path.includes('trial-results')) {
			//find out what categories the user requested
			const splitPath = path.split('/trial-results/');
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
	render() {
	    return (
	      	<div className="selectedresults results page">
	      		<section className="topOPage flexMe">
			      	<Title />
			      	<QuerySelector
			      		findPathName={this.findPathName} />
		      	</section>
	      		<MyTable 
	      			categories={this.state.categories}
	      	 		deathPage={this.state.deathPage}/>
	      	</div>
	    );
	}
}

export default connect(null, { fetchHeadings })(TrialResults);
