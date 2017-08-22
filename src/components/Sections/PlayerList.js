import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';


import { fetchPlayers, deletePlayer, editPlayer } from '../../actions/player_actions.js';
import { fetchHeadings, addHeading, deleteHeading } from '../../actions/heading_actions.js';
import { fetchCertificates, createCertificateObject } from '../../actions/certificate_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
import EditPlayerForm from '../Bits/editPlayer';
//import PlayerNames from '../Bits/playerNames';
//import PlayerInfo from '../Bits/playerInfo';
import sortByMultiple from '../../functions/sortRow.js'
import slug from '../../functions/slug.js'


class PlayerList extends Component {
	constructor(props){
		super(props);
		this.parsePathname = this.parsePathname.bind(this)
		this.openCert = this.openCert.bind(this)
		this.closeCert = this.closeCert.bind(this)

		this.state = {
			name: '',
			showEditForm: false,
			editPlayerID: '',
			sortColumn: []
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
		createCertificateObject()
		this.props.fetchPlayers();
		this.props.fetchHeadings();
		this.props.fetchButtons();
		this.props.fetchCertificates();
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
			return true;
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
	openCert(playerName, type){
		let url;
		if (type === "deathDate"){
		 	url = this.props.certificates.death[slug(playerName)].url;
		} else if(type === "birthDate"){
			url = this.props.certificates.birth[slug(playerName)].url;
		} else {
			return;
		}
		const lightbox = document.getElementById('certLightbox');
		const img = lightbox.getElementsByTagName('img')
		img[0].src = url;
		lightbox.classList.add('lightboxOn');
	}
	closeCert(){
		const lightbox = document.getElementById('certLightbox');
		const img = lightbox.getElementsByTagName('img')
		img[0].src = "#";
		lightbox.classList.remove('lightboxOn');
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
						return true;
					}) //column keys map
				};
				return true;
			}); //categories mapp
			return true;
		}); //buttons map
		// console.log(rowHeadings);

		return rowHeadings;
	}
	render(){
		const players = this.props.players;
		const keys = Object.keys(this.props.players);		
		
		//const row = this.props.headings;
		const rowKeys = Object.keys(this.props.headings);
		let rowHeadings = Object.values(this.props.headings);
		//console.log(rowHeadings, "rowHeadings");
		const rowHeadingsFinal = [];
		if (location.pathname.indexOf('selected') !== -1) {
			const rowHeadingsChosen = this.parsePathname(location.pathname);
			//for each row heading if it's name is in the list of rowHeadingsChosen than push the whole item into the final array
			rowHeadings.map((rowHeading) => {
				if(rowHeadingsChosen.indexOf(rowHeading.name) !== -1){
					rowHeadingsFinal.push(rowHeading);
				}
				return true;
			});
		} else {
			rowHeadingsFinal.push(...rowHeadings);
		}

		let certificates = this.props.certificates;
		const certificateDeathKeys = Object.keys(this.props.certificates);		
		let hasBirthCert, hasDeathCert;
		if (certificates.birth){
			hasBirthCert = Object.keys(certificates.birth);		
		}
		if (certificates.death){
			hasDeathCert = Object.keys(certificates.death);		
		}
		//for each item in certificates.name

		
		//go get rowBirth or rowDeath (depending on certificates.type) 
		//and add a class of hasCert 
		//and use certificates[i].url for the image
		return(
			<div className="playerList">
				{/*<PlayerNames keys={keys} rowHeadings={rowHeadings} players={players}/>*/}
		      	<table id="playerInfo" className="scrollableTable">
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
		      			{ this.props.edit 
		      					? 
		      				<td>	
			      				<input id="newColumnLabel" type="text"></input>
			      				<button onClick={this.onAddColumn.bind(this)}>Add Column</button> 
		      				</td>

		      				:
		      				<td></td>
		      			}

		      			</tr>
		      		</thead>
		      		<tbody>
		      			{keys.map((index) => {
		      				const nameSlug = slug(players[index].name);
		      				// const birthCertIndex = hasBirthCert.indexOf(nameSlug);
		      				// const deathCertIndex = hasDeathCert.indexOf(nameSlug)
			                return (
			                  <tr key={"row" + index}>
			                    {rowHeadingsFinal.map((a) => {
			                    	if((a.name === "birthDate" && hasBirthCert.indexOf(nameSlug) !== -1) || (a.name === "deathDate" && hasDeathCert.indexOf(nameSlug) !== -1)){
										return(
											<td className={a.name + " hasCert"} key={a.name + index} onClick={() => this.openCert(players[index].name, a.name)}>{players[index][a.name]}</td>
										);
			                     	} else {
			                    		return(
			                     			<td className={a.name} key={a.name + index}>{players[index][a.name]}</td>
			                     		);	
			                    	}
			                     
			                   
			                	})} 
			                    { this.props.edit ? <td><button id={index} onClick={this.onDeletePlayer.bind(this)}>Delete Player</button><button id={index} onClick={this.onToggleEditForm.bind(this)}>Edit Player</button></td> : <td></td>}
			                  </tr>
			                );
			              })}
		      		</tbody>
		      	</table>
			 {this.state.showEditForm ? <EditPlayerForm playerID={this.state.editPlayerID} hideForm={this.onHideEditForm.bind(this)}/> : ""}
			<div id="certLightbox">
				<img src="#" alt="Birth or Death Certificate for Player clicked on"/>
				<div className="closeLightbox" onClick={this.closeCert}>X</div>
			</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		buttons: state.buttons,
		certificates: state.certificates
	}
}


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings, fetchButtons, addHeading, deleteHeading, fetchCertificates})(PlayerList);