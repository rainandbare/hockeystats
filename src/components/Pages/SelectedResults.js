import React, { Component } from 'react';

import Title from '../Bits/title.js';
import PlayerList2 from '../Sections/PlayerList2.js';
import QuerySelector from '../Sections/QuerySelector.js';
import DeathAverage from '../Bits/deathAverage.js';


class SelectedResults extends Component {
	constructor(props){
		super(props);
		this.findPathName = this.findPathName.bind(this)


		this.state = {
			deathPage : false,
			categories: []
		}
	}
	componentWillMount(){
		this.findPathName(location.pathname);
	}
	findPathName(path){
		if (path.includes('selected')) {
			//find out what categories the user requested
			const splitPath = path.split('/selected/');
			splitPath.shift();
			const categories = splitPath[0].split('-');
			//console.log(categories, categories.findIndex(isDeathInfo))

			//find out if it is just the Death Info category
			let deathPage = false;
			if((categories.length === 1) && (categories.findIndex(isDeathInfo) !== -1)){
				deathPage = true;
				console.log(deathPage, "deathPage");
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
		      	{this.state.deathPage ? <DeathAverage /> : ""}
		      	<QuerySelector 
		      		findPathName={this.findPathName}/>
	      	</section>
	      	 <PlayerList2 
	      	 	categories={this.state.categories}
	      	 	deathPage={this.state.deathPage}
	      	 />
	      </div>
	    );
	}
}

export default SelectedResults;
