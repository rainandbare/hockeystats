import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayers, deletePlayer, editPlayer } from '../actions/player_actions.js';
import { fetchHeadings } from '../actions/heading_actions.js';
import { fetchButtons } from '../actions/button_actions.js';
import EditPlayerForm from './Results/editPlayer';


class PlayerList extends Component {
	constructor(props){
		super(props);
		this.parsePathname = this.parsePathname.bind(this);
		this.state = {
			name: '',
			showEditForm: false,
			editPlayerID: ''
		}
	}
	componentDidMount(){
		this.props.fetchPlayers();
		this.props.fetchHeadings();
		this.props.fetchButtons();

	}
	onDeletePlayer(e){
		this.props.deletePlayer(e.target.id)
	}
	onEditPlayer(e){
		const info = {
						name: "Joe Dimajio",
						age: 12,
					};
		this.props.editPlayer(e.target.id, info)
	}
	onToggleEditForm(e){
		this.setState({
			showEditForm: true,
			editPlayerID: e.target.id
		})
	}
	parsePathname(path){
		const splitPath = path.split('/selected/');
		splitPath.shift();
		const categories = splitPath[0].split('-');
		//console.log(categories)
		const buttons = this.props.buttons;
		const buttonKeys = Object.keys(this.props.buttons);
		const rowHeadings = [];
		buttonKeys.map((key) => {
			categories.map((category) =>{
				if(buttons[key].buttonLabel === category){
					const columnKeys = Object.keys(buttons[key].columns);
					const columns = buttons[key].columns;
					columnKeys.map((columnKey) => {
						if (columns[columnKey] === true){
							rowHeadings.push(columnKey);
						}
					}) //column keys map
				};
			}); //categories mapp
			
		}); //buttons map
		// console.log(rowHeadings);

		return rowHeadings;
	}
	render(){
		

		const players = this.props.players;
		const keys = Object.keys(this.props.players);		
		
	

		let rowHeadings = Object.values(this.props.headings);
		const rowHeadingsFinal = [];
		if (location.pathname.indexOf('selected') !== -1) {
			const rowHeadingsChosen = this.parsePathname(location.pathname);
			console.log(rowHeadingsChosen, "chosen");
			rowHeadings.map((rowHeading) => {
				if(rowHeadingsChosen.indexOf(rowHeading.name) !== -1){
					rowHeadingsFinal.push(rowHeading);
				}
			});
		} else {
			rowHeadingsFinal.push(...rowHeadings);
		}


		

	
		return(
			<div className="playerList">
				<table>
					<thead>
						<tr>
							<th>
							Name
							</th>
						</tr>
					</thead>
					<tbody>
						{
						//for every player in the list	
						keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>

			                    {
			                    //if the rowHeading is === to Name
			                    rowHeadings.map((a) => {
			                    	if(a.name === rowHeadings[0].name){

			                    		return(
			                     			<th key={a.name + index}>{players[index][a.name]}</th>
			                     		);
			                    	} else { 
			                    		return <div key={a.name + index}></div>
			                    	};
			                	})} 
			                </tr>
			                );
			              })}
					</tbody>
				</table>
		      	<table className="scrollableTable">
		      		<div className="overlay">
		      		<thead>
		      			<tr>
		      			{rowHeadingsFinal.map((a) => {
		      				if(a.name === rowHeadings[0].name){
								return(<th key={a}></th>);
			                } 
			                return(
		      					<th key={a.name} id={a.name}>{a.label}</th>
		      				);
		      			})}
		      			</tr>
		      		</thead>
		      		<tbody>
		      			{keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>
			                    {rowHeadingsFinal.map((a) => {
			                    	if(a.name === rowHeadings[0].name){
										return(<th key={a}></th>);
			                    	}
			                     return(
			                     		<td key={a.name + index}>{players[index][a.name]}</td>
			                     	);
			                   
			                	})} 
			                    <td>{this.props.edit ? <button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button> : ""}</td>
			                    <td>{this.props.edit ? <button id={index} onClick={this.onToggleEditForm.bind(this)}>Edit Player</button> : ""}</td>
			                  </tr>
			                );
			              })}
		      		</tbody>
		      		</div>
		      	</table>
			 {this.state.showEditForm ? <EditPlayerForm playerID={this.state.editPlayerID}/> : ""}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		buttons: state.buttons
	}
}


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings, fetchButtons })(PlayerList);