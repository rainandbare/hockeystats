import React, { Component } from 'react';
import { connect } from 'react-redux';

import './deathAverage.css';

class DeathAverage extends Component {
	constructor(props){
		super(props);
		this.getDeathAverage = this.getDeathAverage.bind(this);
	}
	componentWillMount(){
		this.getDeathAverage();
	}
	getDeathAverage(){
		//select only the players who are deceased
		let deathAverage = "--";
		const players = this.props.players.list;
		const keys = Object.keys(players);

		let playersAgeSum = keys.filter((index) => { return players[index].status === "DECEASED";})
							.map((index) => { return parseFloat(this.getAge(players[index].birthDate, players[index].deathDate)) });
					
		console.log(playersAgeSum.length);
		if(playersAgeSum.length > 0){
			//console.log(playersAgeSum);
			let addEmUp = playersAgeSum.filter(a => a === a); 
			let deathAverage = addEmUp.reduce(function(sum, a) { return sum + a; },0)/addEmUp.length;
			console.log(addEmUp.length);
			return deathAverage.toFixed(1);
		} else {
			return deathAverage;
		}
	}
	getAge(birthDateString, deathDateString) {
	    const deathDate = new Date(deathDateString);
	    const birthDate = new Date(birthDateString);
	   
	    const milliseconds = deathDate - birthDate;

	    const age = (milliseconds / 1000 / 60 / 60 / 24 / 365).toFixed(2);
	    return age;
	}
	render(){
		const dataIn = this.props.players.list.length;
		if(dataIn > 0){
			const deathAverage = this.getDeathAverage();
			return(
				<section className="deathAverage">
					<h2>Average Age at Death</h2>
					<h4 className="deathAverage-number">{deathAverage}</h4>
					<h2>(ALL DECEASED PLAYERS)</h2>
				</section>
			);
		} else {
			return(<div> </div>);
		}
	}
}

function mapStateToProps(state){
	return {
		players: state.players
	}
}

export default connect(mapStateToProps, null)(DeathAverage);