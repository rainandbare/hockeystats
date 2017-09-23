


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, Column, Cell}  from 'fixed-data-table';
import FontAwesome from 'react-fontawesome';


import searchResultPresent from '../../functions/customStringReplace.js'

import { fetchPlayers, sortPlayers } from '../../actions/player_actions.js';
import { fetchHeadings } from '../../actions/heading_actions.js';

import 'fixed-data-table/dist/fixed-data-table.min.css';
import './playerList.css';

class SortExample extends Component {
  constructor(props) {
    super(props);
	this.props.fetchPlayers();
	this.props.fetchHeadings();

	this.state = {
      colSortDirs: {},
    };

    this.onSortChange = this.onSortChange.bind(this);
    this.onLock = this.onLock.bind(this);
    this.getPlayerKeys = this.getPlayerKeys.bind(this);

  }
  onSortChange(columnKey, sortDir, keysArray) {
  	this.props.sortPlayers(columnKey, sortDir, keysArray, this.props.players.list)
  	this.setState({
      colSortDirs: {
        [columnKey]: sortDir,
      }
    });
  }	
  onLock(){
    console.log('row locked')
  }
  getPlayerKeys(players){
  	let playersKeys = [];
  	if (Object.keys(this.props.players.sortRules).length === 0){
   		playersKeys = Object.keys(players);
  	} else {
  		playersKeys = this.props.players.sortRules;
  	}
  	return playersKeys;
  }
  render() {
  	const headings = this.props.headings;
  	console.log(this.props.searchTerm)
  	const players = this.props.players.list
  	const playersKeys = this.getPlayerKeys(players);
  	const rowsCount = playersKeys.length;
   	var {colSortDirs} = this.state;



    if (rowsCount !== 0){
    return (
      <Table
        rowHeight={50}
        rowsCount={rowsCount}
        headerHeight={50}
        width={1200}
        height={650}
        {...this.props}>
        {
        	headings.map((heading) => {
        		if (heading.name === "name"){
        			return( 
        				<Column
        				  key={heading.name}
				          columnKey={heading.name}
				          fixed="true"
				          header={
				            <SortHeaderCell
				              onSortChange={this.onSortChange}
				              sortDir={colSortDirs[heading.name]}
                      onLock={this.onLock}
				              playersKeys={playersKeys}>
				              {heading.label}
				            </SortHeaderCell>
				          }
				          cell={<TextCell data={players} keys={playersKeys} searchTerm={this.props.searchTerm}/>}
				          width={150}
				        />
        			);
        		} else {
        		
	        		return(
	        			<Column
	        		      key={heading.name}
				          columnKey={heading.name}
				          header={
				            <SortHeaderCell
				              onSortChange={this.onSortChange}
                      onLock={this.onSortChange}
				              sortDir={colSortDirs[heading.name]}
				              playersKeys={playersKeys}>

				              {heading.label}
				            </SortHeaderCell>
				          }
				          cell={<TextCell data={players} keys={playersKeys} searchTerm={this.props.searchTerm}/>}
				          width={150}
				        />

	        		);
        	}
        	})
        }
      </Table>
    );
	}	else {
		return(
			<div></div>
			);
	}
  }
}

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
    this.onLock = this.onLock.bind(this);
  }

  render() {
    var {sortDir, children, playersKeys, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this.onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''} 
        </a>
        {sortDir ? 
          <a onClick={this.onLock}>
            <FontAwesome name='lock' />
          </a> 
        : ''} 
      </Cell>
    );
  }
  onLock(){
    if (this.props.onLock) {
      this.props.onLock( );
    }
  }

  onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange( this.props.columnKey, this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC, this.props.playersKeys);
    }
  }
}

const TextCell = ({rowIndex, data, columnKey, keys, searchTerm, ...props}) => (
  <Cell {...props}>
     
    {	//reactStringReplace(data[keys[rowIndex]][columnKey], searchTerm, (match, i) => (
		// 	<span key={i} className="search-highlight">{match}</span>
		// ))

		//customStringReplace(data[keys[rowIndex]][columnKey], searchTerm)
   	}


    <div className={searchResultPresent(data[keys[rowIndex]][columnKey], searchTerm) ? "searchResult" : ""}>  {data[keys[rowIndex]][columnKey]} </div>
  </Cell>
);


function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		searchTerm: state.searchTerm,
		// buttons: state.buttons,
		// certificates: state.certificates,
	}
}


export default connect(mapStateToProps, { fetchPlayers, sortPlayers, fetchHeadings })(SortExample);
