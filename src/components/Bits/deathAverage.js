import React, { Component } from 'react';
import { connect } from 'react-redux';

class DeathAverage extends Component {
	constructor(props){
		super(props);
		this.getDeathAverage = this.getDeathAverage.bind(this);
	}
	getDeathAverage(){
		//select only the players who are deceased
		let deathAverage = 0;
		let playersAgeArray = [];
		const players = this.props.players;
		const keys = Object.keys(this.props.players);

		let playersAgeSum = keys.filter((index) => { return players[index].status === "DECEASED";})
							.map((index) => { return parseFloat(this.getAge(players[index].birthDate, players[index].deathDate)) });
		console.log(playersAgeSum)
		
		if(playersAgeSum.length > 0){
			deathAverage = playersAgeSum.reduce(function(sum, a) { return sum + a },0)/(playersAgeSum.length||1);
		}
		
		return deathAverage.toFixed(2);
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
				<h2>This is the death Average</h2>
				<h4 className="deathAverage-number">{deathAverage}</h4>
				<h6>years old</h6>

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