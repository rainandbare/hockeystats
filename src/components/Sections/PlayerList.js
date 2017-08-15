import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import { fetchPlayers, deletePlayer, editPlayer } from '../../actions/player_actions.js';
import { fetchHeadings, addHeading, deleteHeading } from '../../actions/heading_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
import EditPlayerForm from '../Bits/editPlayer';
//import PlayerNames from '../Bits/playerNames';
//import PlayerInfo from '../Bits/playerInfo';
import sortByMultiple from '../../functions/sortRow.js'
import slug from '../../functions/slug.js'


class PlayerList extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			showEditForm: false,
			editPlayerID: '',
			sortColumn: []
		};
	}
	componentDidMount(){
		this.props.fetchPlayers();
		this.props.fetchHeadings();
		this.props.fetchButtons();
	}
	componentDidUpdate(){
		this.handleColumns();
	}
	onSort(e){
		const previousColumn = this.state.sortColumn;
		const incomingColumn = e.target.parentNode.id;

		if (previousColumn.includes(incomingColumn)) {
			//console.log('toggle column off')
			const i = previousColumn.indexOf(incomingColumn);
			previousColumn.splice(i, 1);
			this.setState({ previousColumn });
		} else if (previousColumn.length < 2) {
			// 	console.log('new single sort')
			previousColumn.push(incomingColumn);
			this.setState({ previousColumn });
		} else {
			console.log("Sorry! You can only sort by two rows at a time!")
		}
	}
	handleColumns(){
		const sortColumnArray = this.state.sortColumn;
		//remove any sortingBy classes on the table
		$('table#playerInfo').find('*').removeClass("sortingBy").removeClass("sortingBy-2");
				
		sortColumnArray.map((id) => {
			//find index of column
			const column = document.querySelector('th#' + id);
			const headerRow = Array.from(column.parentNode.children);
			const columnIndex = headerRow.indexOf(column);
			//add class to the column
			const i = sortColumnArray.indexOf(id);
			if (i === 0){
				$('th#' + id).closest('table')
					.find("tr td:nth-child(" + (columnIndex+1) + ")")
					.addClass("sortingBy")
				$('th#' + id).addClass("sortingBy");
			} else if (i === 1){
				$('th#' + id).closest('table')
					.find("tr td:nth-child(" + (columnIndex+1) + ")")
					.addClass("sortingBy-2")
				$('th#' + id).addClass("sortingBy-2");
			}
		});
		sortByMultiple(sortColumnArray);


	}
	onAddColumn(e){
		const label = e.target.previousSibling.value;
		const name = slug(label);
		const heading = {
			name,
			label
		}
		this.props.addHeading(heading);
	}
	onDeleteColumn(e){
		this.props.deleteHeading(e.target.id)
	}
	onDeletePlayer(e){
		this.props.deletePlayer(e.target.id)
	}
	// onEditPlayer(e){
	// 	const info = {
	// 					name: "Joe Dimajio",
	// 					age: 12,
	// 				};
	// 	this.props.editPlayer(e.target.id, info)
	// }
	onHideEditForm(){
		this.setState({
			showEditForm: false
		})
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
		
		const row = this.props.headings;
		const rowKeys = Object.keys(this.props.headings);
		let rowHeadings = Object.values(this.props.headings);
		//console.log(rowHeadings, "rowHeadings");
		const rowHeadingsFinal = [];
		if (location.pathname.indexOf('selected') !== -1) {
			const rowHeadingsChosen = this.parsePathname(location.pathname).bind(this);
			//for each row heading if it's name is in the list of rowHeadingsChosen than push the whole item into the final array
			rowHeadings.map((rowHeading) => {
				if(rowHeadingsChosen.indexOf(rowHeading.name) !== -1){
					rowHeadingsFinal.push(rowHeading);
				}
			});
		} else {
			rowHeadingsFinal.push(...rowHeadings);
		}
		//console.log(rowHeadingsFinal, "rowHeadingsFinal");
		return(
			<div className="playerList">
				{/*<PlayerNames keys={keys} rowHeadings={rowHeadings} players={players}/>*/}
		      	<table id="playerInfo" className="scrollableTable">
		      		<div className="overlay">
		      		<thead>
		      			<tr>
		      			{rowHeadingsFinal.map((a) => {
		      				const headingIndex = rowHeadings.indexOf(a);
		      				const rowIndex = rowKeys[headingIndex];
			                return(
		      					<th key={a.name} id={a.name}>{a.label}
		      						<button onClick={this.onSort.bind(this)}>Sort</button>
		      						{ this.props.edit ? <button id={rowIndex} onClick={this.onDeleteColumn.bind(this)}>Delete Column</button> : ""}
		      					</th>
		      				);
		      			})}
		      			<td>{ this.props.edit 
		      					? 
		      				<div>	
			      				<input id="newColumnLabel" type="text"></input>
			      				<button onClick={this.onAddColumn.bind(this)}>Add Column</button> 
		      				</div>

		      				:
		      				""
		      			}</td>

		      			</tr>
		      		</thead>
		      		<tbody>
		      			{keys.map((index) => {
			                return (
			                  <tr key={"row" + index}>
			                    {rowHeadingsFinal.map((a) => {
			                    	if(a.name === rowHeadings[0].name){
										return(
											<td className="nameRow" key={a.name + index}>{players[index][a.name]}</td>
										);
			                    	} else {
			                    		return(
			                     			<td key={a.name + index}>{players[index][a.name]}</td>
			                     		);
			                    	}
			                     
			                   
			                	})} 
			                    <td>{this.props.edit ? <div><button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button><button id={index} onClick={this.onToggleEditForm.bind(this)}>Edit Player</button></div> : ""}</td>
			                  </tr>
			                );
			              })}
		      		</tbody>
		      		</div>
		      	</table>
			 {this.state.showEditForm ? <EditPlayerForm playerID={this.state.editPlayerID} hideForm={this.onHideEditForm.bind(this)}/> : ""}
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


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings, fetchButtons, addHeading, deleteHeading })(PlayerList);