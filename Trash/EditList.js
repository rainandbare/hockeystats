import React, { Component } from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';

import { fetchPlayers, deletePlayer, editPlayer } from '../../actions/player_actions.js';
import { fetchHeadings, addHeading, deleteHeading } from '../../actions/heading_actions.js';
import { fetchCertificates } from '../../actions/certificate_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
import {Table, Column, Cell}  from 'fixed-data-table';


class PlayerList extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}

	componentDidMount(){
	
	}
	componentDidUpdate(){
		// this.handleColumns();
	}
	
	render(){
		const players = this.props.players;
		console.log(players);
		return(
			<div>THIS WILL BE A TABLE</div>
			);
	}
}

function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		buttons: state.buttons,
		certificates: state.certificates,
		searchTerm: state.searchTerm
	}
}


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings, fetchButtons, addHeading, deleteHeading, fetchCertificates})(PlayerList);