import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, Column, Cell}  from 'fixed-data-table';
import FontAwesome from 'react-fontawesome';

import Lightbox from '../Bits/certificationsLightbox.js'

import slug from '../../functions/slug.js'

import { fetchPlayers, sortPlayers, filterPlayers } from '../../actions/player_actions.js';
import { fetchHeadings } from '../../actions/heading_actions.js';
import { fetchButtons } from '../../actions/button_actions.js';
// import { fetchCertificates, createCertificateObject } from '../../actions/certificate_actions.js';
import { fetchCertificates } from '../../actions/certificate_actions.js';

import 'fixed-data-table/dist/fixed-data-table.min.css';
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
    };

    this.onSortChange = this.onSortChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.getPlayerKeys = this.getPlayerKeys.bind(this);
    this.adjustHeadingsPerUrl = this.adjustHeadingsPerUrl.bind(this);
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this);
    this.isDeathPage = this.isDeathPage.bind(this);
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
    console.log('changed', newColumnWidth, columnKey, this.state.columnWidths)
    this.setState({
      columnWidths: {
        ...this.state.columnWidths,
        [columnKey]: newColumnWidth,
      }
    });
  }
  adjustHeadingsPerUrl(possibleHeadings, buttons){


    const categories = this.props.categories;
    const buttonKeys = Object.keys(buttons);
    
  
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
    if (location.pathname.indexOf('results') !== -1) {
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
    if(rowHeadingsObjectsFinal.length === 0){
      rowHeadingsObjectsFinal.push(...possibleRowHeadings);
    }
    
    return rowHeadingsObjectsFinal;
  }
  openCert(certificates, playerName, type){
    //find out if there is more than one image

    let urls;
    if (type === "deathDate"){
      
      urls = getImageCount("death");


      //url = certificates.death[playerName].url;
    } else if(type === "birthDate"){

      urls = getImageCount("birth")
    } 

    const lightbox = document.getElementById('certLightbox');

    for (var index = 0; index < urls.length; index++) {
      const img = document.createElement('img')
      img.setAttribute("src", urls[index]);
      const imageWrapper = document.getElementById('lightBoxImageWrapper')
      imageWrapper.appendChild(img);
    }


      // const img = lightbox.getElementsByTagName('img')
      // img[0].src = url;
      lightbox.classList.add('lightboxOn');      
    

    function getImageCount(type){
      const nameArray = Object.keys(certificates[type]).map((cert) => { const name = cert.split('-'); return name[0] });
      const imageCount = getOccurrence( nameArray, playerName);

      let imageUrl =[];
      if(imageCount === 1){
        imageUrl.push(certificates[type][playerName].url);
      } else {

       
        for (var index = 0; index < imageCount; index++) {
          let multiImageUrl;
          if(index === 0){
            multiImageUrl = certificates[type][playerName].url;
          } else {
            multiImageUrl = certificates[type][playerName + "-" + (index + 1)].url
          }
        
          imageUrl.push(multiImageUrl)
        }
      }
      return imageUrl;
    }

    function getOccurrence(array, value) {
          return array.filter((v) => (v === value)).length;
      }
  }

  render() {
  	const players = this.props.players.list
    const headings = this.adjustHeadingsPerUrl(this.props.headings, this.props.buttons);
  	const playersKeys = this.getPlayerKeys(players);
  	const rowsCount = playersKeys.length;

   	var {colSortDirs, columnWidths} = this.state;

    if(Object.keys(columnWidths).length === 0){
      for (var index = 0; index < headings.length; index++) {
       columnWidths[headings[index].name] = 150;
      }
    }

    if (rowsCount !== 0){
    return (
      <div>
        <Table
          rowHeight={40}
          rowsCount={rowsCount}
          headerHeight={70}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
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
  				          fixed={true}
                    isResizable={true}
                    minWidth={70}
                    maxWidth={500}
                    flexGrow={1}
  				          header={
  				            <SortHeaderCell
  				              onSortChange={this.onSortChange}
                        onFilter={this.onFilter}
  				              sortDir={colSortDirs[heading.name]}
  				              playersKeys={playersKeys}
                        >
  				              {heading.label}
  				            </SortHeaderCell>
  				          }
  				          cell={<NameCell data={players} keys={playersKeys}/>}
  				          width={columnWidths[heading.name]}
  				        />
          			);
          		} else {
  	        		return(
  	        			<Column
  	        		    key={heading.name}
  				          columnKey={heading.name}
                    isResizable={true}
                    minWidth={70}
                    maxWidth={500}
                    flexGrow={1}
  				          header={
  				            <SortHeaderCell
  				              onSortChange={this.onSortChange}
                        onFilter={this.onFilter}
  				              sortDir={colSortDirs[heading.name]}
  				              playersKeys={playersKeys}>

  				              {heading.label}
  				            </SortHeaderCell>
  				          }
  				          cell={<TextCell 
                            data={players} 
                            keys={playersKeys} 
                            openCert={this.openCert}
                            certificates={this.props.certificates}
                            />
                          }
  				          width={columnWidths[heading.name]}
  				        />
  	        		);
          	  }
          	})
          }
        </Table>
        <Lightbox />
      </div>
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
    this.onFilter = this.onFilter.bind(this)
  }

  render() {
    var {sortDir, children, playersKeys, ...props} = this.props;
    return (

        
        <Cell {...props}>
          <a onClick={this.onSortChange}>
            {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''} 
          </a>
          <input className="search" onChange={this.onFilter} placeholder="Search"/>
        </Cell>

    );
  }
  onFilter(e){
     if (this.props.onFilter) {
      this.props.onFilter(e.target.value, this.props.columnKey)
    }
  }

  onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange( this.props.columnKey, this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC, this.props.playersKeys);
    }
  }
}

const TextCell = ({rowIndex, data, columnKey, keys, openCert, certificates, ...props}) => {
  return(
    <Cell {...props} className={data[keys[rowIndex]]["status"].toLowerCase()}>
      {data[keys[rowIndex]][columnKey]}
      { (columnKey === "birthDate") && (Object.keys(certificates.birth).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
      { (columnKey === "deathDate") && (Object.keys(certificates.death).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
    </Cell>
  )};

const NameCell = ({rowIndex, data, columnKey, playerNumber, keys, ...props}) => (
  <div className="name">
    <div className="playerNumber">{rowIndex + 1}</div>
    <Cell {...props} className={data[keys[rowIndex]]["status"].toLowerCase()}>
      {data[keys[rowIndex]][columnKey]}
    </Cell>
  </div>
);


function mapStateToProps(state){
	return {
		players: state.players,
		headings: state.headings,
		buttons: state.buttons,
		certificates: state.certificates,
	}
}


export default connect(mapStateToProps, { fetchPlayers, sortPlayers, filterPlayers, fetchHeadings, fetchButtons, fetchCertificates })(SortExample);
