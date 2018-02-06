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
    //createCertificateObject()
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
        maxColumn: 0,
        width: 1200,
        height: 550
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
  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
  updateDimensions() {
      if(window.innerWidth < 767){
        let update_width  = window.innerWidth-40;
        let update_height = window.innerHeight-150;
        this.setState({ width: update_width, height: update_height });
      } else {
        let update_width  = window.innerWidth-80;
        let update_height = window.innerHeight-150;
        this.setState({ width: update_width, height: update_height });
      }
  }
  onFilter(input, changedColumn){
    const players = this.props.players.list;
    let locked = this.state.colLocked;
    let columnKey = changedColumn;
    let term = input;
      // --------------------------DO I NEED THIS-----------------------
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
    //CLEAN UP LOCKED ARRAY 
    //erase current deleted term from locked array
    locked[columnKey] = term;  
    const allColumns = Object.keys(locked);
   
    //if the locked array has any values of empty strings
    const emptyStringPosition = Object.values(locked).indexOf('');
    if(emptyStringPosition !== -1){
      //remove the key and value from the object
       delete locked[allColumns[emptyStringPosition]];
    }
    //CLEAN UP TERM
    //the term is an empty string if the change the user made to the input box is a delete action
    if( term === '' ){
      //but it doesn't matter if there are more than one locked columns because then we pass the term array
      if(Object.keys(locked).length === 1){
        term = Object.values(locked)[0];
        columnKey = Object.keys(locked)[0];
      }
    } 
    const columnArray = Object.keys(locked);
    const termArray = Object.values(locked);
  
    
    if(Object.keys(locked).length > 1){
      //filter by multiple rows.
      playersKeys = Object.keys(players);
      this.props.filterPlayers(termArray, playersKeys, players, columnArray, true, this.state.colSortDirs);
    } else {
      // console.log('changed', term, columnKey, players, playersKeys)
      this.props.filterPlayers(term, playersKeys, players, columnKey, false, this.state.colSortDirs);      
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
    //if there are no sortRules 
    if (Object.keys(this.props.players.sortRules).length === 0){
      //console.log("there are no players in sortRules", this.props.players.sortRules)
      //and there is nothing in the filtered serah inputs
      if(Object.keys(this.state.colLocked).length === 0){
        //console.log("because there is nothing in the filtered search", Object.keys(this.state.colLocked).length, this.state.colLocked)
        //then return all of the players
        playersKeys = Object.keys(players);
        //unless it is the death page
        if(this.props.deathPage){
         // console.log("this is the death page");
          //then just return the dead players
          playersKeys = this.isDeathPage(playersKeys, players)      
        }
      } else {
       // console.log("because the search is too specific", Object.keys(this.state.colLocked).length, this.state.colLocked)
        //if there is something in the search fields
        //return "none"
        playersKeys = ["none"];
      }
      
    } else {
     // console.log("there are players in sortRules", this.props.players.sortRules, this.state.colLocked)
      playersKeys = this.props.players.sortRules;
      if(this.props.deathPage){
          playersKeys = this.isDeathPage(playersKeys, players)      
      }
    }    
    // console.log(playersKeys);
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
            width={this.state.width}
            height={this.state.height}
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
			<div className="svg-loader-container">
        <svg className="svg-loader">
         <path 
          fill="#808080" 
          d="M10,40c0,0,0-0.4,0-1.1c0-0.3,0-0.8,0-1.3c0-0.3,0-0.5,0-0.8c0-0.3,0.1-0.6,0.1-0.9c0.1-0.6,0.1-1.4,0.2-2.1
          c0.2-0.8,0.3-1.6,0.5-2.5c0.2-0.9,0.6-1.8,0.8-2.8c0.3-1,0.8-1.9,1.2-3c0.5-1,1.1-2,1.7-3.1c0.7-1,1.4-2.1,2.2-3.1
          c1.6-2.1,3.7-3.9,6-5.6c2.3-1.7,5-3,7.9-4.1c0.7-0.2,1.5-0.4,2.2-0.7c0.7-0.3,1.5-0.3,2.3-0.5c0.8-0.2,1.5-0.3,2.3-0.4l1.2-0.1
          l0.6-0.1l0.3,0l0.1,0l0.1,0l0,0c0.1,0-0.1,0,0.1,0c1.5,0,2.9-0.1,4.5,0.2c0.8,0.1,1.6,0.1,2.4,0.3c0.8,0.2,1.5,0.3,2.3,0.5
          c3,0.8,5.9,2,8.5,3.6c2.6,1.6,4.9,3.4,6.8,5.4c1,1,1.8,2.1,2.7,3.1c0.8,1.1,1.5,2.1,2.1,3.2c0.6,1.1,1.2,2.1,1.6,3.1
          c0.4,1,0.9,2,1.2,3c0.3,1,0.6,1.9,0.8,2.7c0.2,0.9,0.3,1.6,0.5,2.4c0.1,0.4,0.1,0.7,0.2,1c0,0.3,0.1,0.6,0.1,0.9
          c0.1,0.6,0.1,1,0.1,1.4C74,39.6,74,40,74,40c0.2,2.2-1.5,4.1-3.7,4.3s-4.1-1.5-4.3-3.7c0-0.1,0-0.2,0-0.3l0-0.4c0,0,0-0.3,0-0.9
          c0-0.3,0-0.7,0-1.1c0-0.2,0-0.5,0-0.7c0-0.2-0.1-0.5-0.1-0.8c-0.1-0.6-0.1-1.2-0.2-1.9c-0.1-0.7-0.3-1.4-0.4-2.2
          c-0.2-0.8-0.5-1.6-0.7-2.4c-0.3-0.8-0.7-1.7-1.1-2.6c-0.5-0.9-0.9-1.8-1.5-2.7c-0.6-0.9-1.2-1.8-1.9-2.7c-1.4-1.8-3.2-3.4-5.2-4.9
          c-2-1.5-4.4-2.7-6.9-3.6c-0.6-0.2-1.3-0.4-1.9-0.6c-0.7-0.2-1.3-0.3-1.9-0.4c-1.2-0.3-2.8-0.4-4.2-0.5l-2,0c-0.7,0-1.4,0.1-2.1,0.1
          c-0.7,0.1-1.4,0.1-2,0.3c-0.7,0.1-1.3,0.3-2,0.4c-2.6,0.7-5.2,1.7-7.5,3.1c-2.2,1.4-4.3,2.9-6,4.7c-0.9,0.8-1.6,1.8-2.4,2.7
          c-0.7,0.9-1.3,1.9-1.9,2.8c-0.5,1-1,1.9-1.4,2.8c-0.4,0.9-0.8,1.8-1,2.6c-0.3,0.9-0.5,1.6-0.7,2.4c-0.2,0.7-0.3,1.4-0.4,2.1
          c-0.1,0.3-0.1,0.6-0.2,0.9c0,0.3-0.1,0.6-0.1,0.8c0,0.5-0.1,0.9-0.1,1.3C10,39.6,10,40,10,40z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
        </svg>
      </div>
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
