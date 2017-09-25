import React, { Component } from 'react';
import { connect } from 'react-redux';

import './deathAverage.css';

class DeathAverage extends Component {
	constructor(props){
		super(props);
		this.getDeathAverage = this.getDeathAverage.bind(this);
	}
	getDeathAverage(){
		//select only the players who are deceased
		let deathAverage = 76.8;
		// let playersAgeArray = [];
		// const players = this.props.players.list;
		// const keys = Object.keys(players);

		// let playersAgeSum = keys.filter((index) => { return players[index].status === "DECEASED";})
		// 					.map((index) => { return parseFloat(this.getAge(players[index].birthDate, players[index].deathDate)) });
		// if(playersAgeSum.length > 0){
		// 	deathAverage = playersAgeSum.reduce(function(sum, a) { return sum + a },0)/(playersAgeSum.length||1);
		// }
		return deathAverage.toFixed(1);;
	}
	getAge(birthDateString, deathDateString) {
	    const deathDate = new Date(deathDateString);
	    const birthDate = new Date(birthDateString);
	   
	    const milliseconds = deathDate - birthDate;

	    const age = (milliseconds / 1000 / 60 / 60 / 24 / 365).toFixed(2);
	    return age;
	}
	render(){

		const deathAverage = this.getDeathAverage();
		return(
			<section className="deathAverage">
				<h2>Average Age at Death</h2>
				<h4 className="deathAverage-number">{deathAverage}</h4>
				<h2>(ALL DECEASED PLAYERS)</h2>
			</section>
		);
	}
}

function mapStateToProps(state){
	return {
		players: state.players
	}
}

export default connect(mapStateToProps, null)(DeathAverage);