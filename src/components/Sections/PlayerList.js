import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column }  from 'fixed-data-table-2';

import { fetchPlayers, sortPlayers, filterPlayers } from '../../actions/player_actions.js';
import { fetchHeadings, changeWidth } from '../../actions/heading_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
//import { fetchCertificates, createCertificateObject } from '../../actions/certificate_actions.js';
import { fetchCertificates } from '../../actions/certificate_actions.js';

import { TextCell, NameCell, SortHeaderCell } from '../Bits/cells.js'
import ScrollToggle from '../Bits/scrollWithArrows.js';

import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './playerList.css';


class SortExample extends Component {
  constructor(props) {
    super(props);
    // createCertificateObject()
  	this.props.fetchPlayers();
  	this.props.fetchHeadings();
    this.props.fetchButtons();
    this.props.fetchCertificates();

  	this.state = {
        colSortDirs: {},
        colLocked: [],
        columnWidths: {},
        currentColumnIndex: 0,
        currentRowIndex: 0,
        scrollWithArrows: false,
        maxColumn: 0
    };

    this.onSortChange = this.onSortChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.getPlayerKeys = this.getPlayerKeys.bind(this);
    this.adjustHeadingsPerUrl = this.adjustHeadingsPerUrl.bind(this);
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.isDeathPage = this.isDeathPage.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onDeleteColumn = this.onDeleteColumn.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this._rowClassNameGetter= this._rowClassNameGetter.bind(this);
    this.onScrollToggle = this.onScrollToggle.bind(this)

  }
  componentDidUpdate() {
      if (this.state.scrollWithArrows){
        document.addEventListener("keydown", this.onKeyDown);
      } else {
        document.removeEventListener("keydown", this.onKeyDown);
      }

  }
  onSortChange(columnKey, sortDir, keysArray) {
  	this.props.sortPlayers(columnKey, sortDir, keysArray, this.props.players.list)
  	this.setState({
      colSortDirs: {
        [columnKey]: sortDir,
      }
    });
  }	
  onFilter(term, columnKey){
    const players = this.props.players.list;
    const locked = this.state.colLocked
    let playersKeys = Object.keys(players);
    let previousTermLength = 0;
    if(locked[columnKey] !== undefined){
      previousTermLength = locked[columnKey].length;
    }

    //if there are other locked columns
    if((Object.keys(locked).length > 0) && (previousTermLength < term.length)){
      //filter altered playersKeys
      playersKeys = this.getPlayerKeys(players);
    }
    locked[columnKey] = term;
    if(previousTermLength > term.length){
      //filter by multiple rows.
      playersKeys = Object.keys(players);
      const columnArray = Object.keys(locked)
      const termArray = Object.values(locked)
      this.props.filterPlayers(termArray, playersKeys, players, columnArray, true);
    } else {
      // console.log('changed', term, columnKey, players, playersKeys)
      this.props.filterPlayers(term, playersKeys, players, columnKey, false);      
    }

    this.setState({
      colLocked: locked
    });
  }
  onScrollToggle(status, headingLength){
    this.setState({
      scrollWithArrows: status,
      maxColumn: headingLength - 1,
    });
  }
  onKeyDown(e){

    if(!e.repeat){
      let rowIndex = parseInt(this.state.currentRowIndex, 10);
      let columnIndex = parseInt(this.state.currentColumnIndex, 10);
      if (e.keyCode === 38) { // up arrow
          
          e.preventDefault();
          rowIndex -= 5;
          if(rowIndex < 0){
            rowIndex = 0;
          }

      }
      else if (e.keyCode === 40) {// down arrow
        e.preventDefault();
         const maxRow = this.getPlayerKeys(this.props.players.list).length;
          console.log(maxRow)
         rowIndex += 5;
         if(rowIndex > maxRow){
            rowIndex = maxRow;
          }
      }
      else if (e.keyCode === 37) { // left arrow
        e.preventDefault();
          columnIndex -= 1
         if(columnIndex < 0){
          columnIndex = 0;
         }

      }
      else if (e.keyCode === 39) { // right arrow
          e.preventDefault();

          columnIndex += 1;
          if(columnIndex > this.state.maxColumn){
            columnIndex = this.state.maxColumn;
          } 
      }
      this.setState({
          currentColumnIndex: columnIndex,
          currentRowIndex: rowIndex
      });
    }
  }
  isDeathPage(playersKeys, players){
    let filteredIndexes = [];

      for (var index = 0; index < playersKeys.length; index++) {
         if(players[playersKeys[index]]['status'] === "DECEASED"){
           filteredIndexes.push(playersKeys[index]);
         };
    }
    return filteredIndexes;
  }
  getPlayerKeys(players){
    let playersKeys = [];
    if (Object.keys(this.props.players.sortRules).length === 0){
      playersKeys = Object.keys(players);
      if(this.props.deathPage){
          playersKeys = this.isDeathPage(playersKeys, players)      
      }
    } else {
      playersKeys = this.props.players.sortRules;
      if(this.props.deathPage){
          playersKeys = this.isDeathPage(playersKeys, players)      
      }
    }    
  	return playersKeys;
  }
  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    if(location.pathname === '/edit'){
      const headingKeys = Object.keys(this.props.headings)
      const headingNames = Object.values(this.props.headings).map((headingObject) => { return headingObject.name })
      const columnID = headingKeys[headingNames.indexOf(columnKey)];
      this.props.changeWidth(newColumnWidth, columnID);
    }
      this.setState({
        columnWidths: {
          ...this.state.columnWidths,
          [columnKey]: newColumnWidth,
        }
      });
  }
  adjustHeadingsPerUrl(possibleHeadings, buttons){
    const buttonKeys = Object.keys(buttons);
    const categories = this.props.categories;

    const rowHeadingsChosen = [];
    //for each possible category in each button
    buttonKeys.map((key) => {
      categories.map((category) =>{
        //if the current chosen buttons has that category in it
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
    const rowHeadingsObjectsFinal = [];
    let possibleRowHeadings = Object.values(this.props.headings);
    if (location.pathname.indexOf('results') !== -1) {
      if(location.pathname.indexOf('all') === -1){
        //if the pathname does not include the word all
        //for each row heading if it's name is in the list of rowHeadingsChosen than push the whole item into the final array
        possibleRowHeadings.map((possibleRowHeading) => {
          if(rowHeadingsChosen.indexOf(possibleRowHeading.name) !== -1){
            rowHeadingsObjectsFinal.push(possibleRowHeading);
          }
          return true;
        });
      } else {
        //if this IS the /results/all page
        rowHeadingsObjectsFinal.push(...possibleRowHeadings);
      }
    } else {
      //if this IS anything but the results page
      rowHeadingsObjectsFinal.push(...possibleRowHeadings);
    }

    if(rowHeadingsObjectsFinal.length === 0){
      rowHeadingsObjectsFinal.push(...possibleRowHeadings);
    }
    
    return rowHeadingsObjectsFinal;
  }
  onRowClick(event, rowIndex){
    const data = this.props.players.list
    const keys = this.getPlayerKeys(data);
    this.props.openEditForm(event, rowIndex, data, keys)
  }
  onDeleteColumn(e){
    this.props.onDeleteColumn(e.target.id);
  }
  _rowClassNameGetter(rowIndex) {
    if (rowIndex === this.state.currentRowIndex) {
      return 'active-row';
    }
  }
  render() {
  	const players = this.props.players.list
    const headings = this.adjustHeadingsPerUrl(this.props.headings, this.props.buttons);
  	const playersKeys = this.getPlayerKeys(players);
  	const rowsCount = playersKeys.length;
   	var {colSortDirs, columnWidths} = this.state;
    if(Object.keys(columnWidths).length !== headings.length ){
      for (var index = 0; index < headings.length; index++) {
       columnWidths[headings[index].name] = headings[index].width;
      }
    }
    let currentColumn = false;
    if(headings[this.state.currentColumnIndex]){
       currentColumn = headings[this.state.currentColumnIndex].name;
    }
    if (rowsCount !== 0){
    return (
      <div>
        <ScrollToggle numheadings={headings.length} onToggle={this.onScrollToggle}/>
        <Table
          rowHeight={40}
          rowsCount={rowsCount}
          headerHeight={70}
          rowClass
          rowClassNameGetter={this._rowClassNameGetter}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          onRowClick={this.onRowClick}
          isColumnResizing={false}
          scrollToRow={this.state.currentRowIndex}
          scrollToColumn={this.state.currentColumnIndex}
          width={1200}
          height={550}
          {...this.props}>
          {
          	headings.map((heading) => {
          		if (heading.name === "name"){
          			return( 
          				<Column
          				  key={heading.name}
  				          columnKey={heading.name}
  				          fixed={true}
                    isResizable={true}
                    minWidth={40}
                    maxWidth={500}
                    flexGrow={1}
  				          header={
  				            <SortHeaderCell
  				              onSortChange={this.onSortChange}
                        onFilter={this.onFilter}
  				              sortDir={colSortDirs[heading.name]}
  				              playersKeys={playersKeys}
                        date={false}
                        onDeleteColumn={false}>
  				              {heading.label}
  				            </SortHeaderCell>
  				          }
  				          cell={<NameCell 
                            data={players} 
                            keys={playersKeys}
                            currentColumn={currentColumn}/>
                            }
  				          width={columnWidths[heading.name]}
  				        />
          			);
          		} else {
  	        		return(
  	        			<Column
  	        		    key={heading.name + "edit"}
  				          columnKey={heading.name}
                    isResizable={true}
                    minWidth={40}
                    maxWidth={500}
                    flexGrow={1}
  				          header={
  				            <SortHeaderCell
  				              onSortChange={this.onSortChange}
                        onFilter={this.onFilter}
  				              sortDir={colSortDirs[heading.name]}
  				              playersKeys={playersKeys}
                        date={heading.type === 'date' ? true : false}
                        onDeleteColumn={heading.deletable && this.props.isEditPage ? this.onDeleteColumn : false}>
  				              {heading.label}
  				            </SortHeaderCell>
  				          }
  				          cell={<TextCell 
                            data={players} 
                            keys={playersKeys} 
                            openCert={this.props.openCert}
                            certificates={this.props.certificates}
                            date={heading.type === 'date' ? true : false}
                            currentColumn={currentColumn}
                            />
                          }
  				          width={columnWidths[heading.name]}
  				        />
  	        		);
          	  }
          	})
          }
        </Table>
      </div>
    );
	}	else {
		return(
			<div>Loading...</div>
			);
	}
  }
}


function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		buttons: state.buttons,
		certificates: state.certificates,
	}
}


export default connect(mapStateToProps, { fetchPlayers, sortPlayers, filterPlayers, fetchHeadings, fetchButtons, fetchCertificates, changeWidth})(SortExample);
