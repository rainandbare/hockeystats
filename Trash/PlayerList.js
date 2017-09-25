import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import reactStringReplace from 'react-string-replace';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';






import { fetchPlayers, deletePlayer, editPlayer } from '../../actions/player_actions.js';
import { fetchHeadings, addHeading, deleteHeading } from '../../actions/heading_actions.js';
import { fetchCertificates /*, createCertificateObject */} from '../../actions/certificate_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
import EditPlayerForm from '../Bits/editPlayer';
import PlayerRow from '../Bits/playerRow.js';
import sortByMultiple from '../../functions/sortRow.js'
import slug from '../../functions/slug.js'


class PlayerList extends Component {
	constructor(props){
		super(props);

		this.openCert = this.openCert.bind(this)
		this.closeCert = this.closeCert.bind(this)
		this.chosenRowHeadings = this.chosenRowHeadings.bind(this)

		this.state = {
			name: '',
			showEditForm: false,
			editPlayerID: '',
			sortColumn: [],
			rowHeadings: []
		};
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
	chosenRowHeadings(){
		//if find out from the button info what rowHeadings are included in each category
		const categories = this.props.categories;
		const buttons = this.props.buttons;
		const buttonKeys = Object.keys(this.props.buttons);
		const rowHeadingsChosen = [];
		const rowHeadingsObjectsFinal = [];

		buttonKeys.map((key) => {
			categories.map((category) =>{
				if(buttons[key].buttonLabel === category){
					const columnKeys = Object.keys(buttons[key].columns);
					const columns = buttons[key].columns;
					columnKeys.map((columnKey) => {
						if (columns[columnKey] === true){
							rowHeadingsChosen.push(columnKey);
						}
						return true;
					}) //column keys map
				};
				return true;
			}); //categories mapp
			return true;
		}); //buttonKeys map

		//if this is NOT the all page
		let possibleRowHeadings = Object.values(this.props.headings);
		if (location.pathname.indexOf('selected') !== -1) {
			//for each row heading if it's name is in the list of rowHeadingsChosen than push the whole item into the final array
			possibleRowHeadings.map((rowHeading) => {
				if(rowHeadingsChosen.indexOf(rowHeading.name) !== -1){
					rowHeadingsObjectsFinal.push(rowHeading);
				}
				return true;
			});
		} else {
			//if this IS the all page
			rowHeadingsObjectsFinal.push(...possibleRowHeadings);
		}
		return rowHeadingsObjectsFinal;
	}
	fixedHeaders(){
		console.log('listening for that body scroll');
	 	$('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
	    $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
	    $('tbody td:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
	}
	render(){
		const players = this.props.players;
		const keys = Object.keys(this.props.players);		
		const rowKeys = Object.keys(this.props.headings);
		const rowHeadings = Object.values(this.props.headings);
		const rowHeadingsFinal = this.chosenRowHeadings();
		return(
			<div>
			<div className="playerList" style={{width: '100%', height: '400px'}}>
		      	<StickyTable stickyColumnCount={1} id="playerInfo" className="scrollableTable">
		      			<Row className="heading-row">
		      			

		      			{
		      				rowHeadingsFinal.map((a) => {
			      				const headingIndex = rowHeadings.indexOf(a);
			      				const rowIndex = rowKeys[headingIndex];
				                return(
			      					<Cell key={a.name} id={a.name}>{a.label}
			      						<button onClick={this.onSort.bind(this)}>Sort</button>
			      						{ this.props.edit ? <button id={rowIndex} onClick={this.onDeleteColumn.bind(this)}>Delete Column</button> : ""}
			      					</Cell>
			      				);
		      				})
		      			}
		      			{ this.props.edit 
		      					? 
		      				<Cell>	
			      				<input id="newColumnLabel" type="text"></input>
			      				<button onClick={this.onAddColumn.bind(this)}>Add Column</button> 
		      				</Cell>
		      				:
		      				<Cell></Cell> }
		      			</Row>
		      			{
		      				keys.map((index) => {
					                return (
					                	<PlayerRow 
					                			players={players}
					                			certificates={this.props.certificates}
					                			searchTerm={this.props.searchTerm}
					                			onDeletePlayer={this.onDeletePlayer.bind(this)}
					                			onToggleEditForm={this.onToggleEditForm.bind(this)}
					                			key={"row" + index}
					                			index={index}
					                			rowHeadingsFinal={rowHeadingsFinal}
					                			edit={this.props.edit}
					                	/>
					                );
				              })
			      		}
		      	</StickyTable>



				{this.state.showEditForm ? <EditPlayerForm playerID={this.state.editPlayerID} hideForm={this.onHideEditForm.bind(this)}/> : ""}
				<div id="certLightbox">
					<img src="#" alt="Birth or Death Certificate for Player clicked on"/>
					<div className="closeLightbox" onClick={this.closeCert}>X</div>
				</div>
				<br/>
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
		certificates: state.certificates,
		searchTerm: state.searchTerm
	}
}


export default connect(mapStateToProps, { fetchPlayers, deletePlayer, editPlayer, fetchHeadings, fetchButtons, addHeading, deleteHeading, fetchCertificates})(PlayerList);