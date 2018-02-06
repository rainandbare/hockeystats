import React, { Component } from 'react';
import { Cell }  from 'fixed-data-table-2';
import FontAwesome from 'react-fontawesome';
import slug from '../../functions/slug.js';
import getAge from '../../functions/getAge.js';
import dateToText from '../../functions/dateToText';

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
     // {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''} 

  render() {
    var {onSortChange, onFilter, sortDir, children, playersKeys, date, onDeleteColumn, isEdit, ...props} = this.props;
    return (
        <Cell {...props}>
          { onDeleteColumn
            ?
            <button 
              id={slug(children)} 
              className="deleteColumn"
              onClick={(e) => onDeleteColumn(e)}>
                &#x02A2F;
            </button>
            :
            ''
          }

          <a className="heading-name-link" onClick={this.onSortChange}>
        
            {children} 
            {sortDir ? (sortDir === SortTypes.DESC ? <div className="sorting-arrows"><FontAwesome name="caret-up"/><FontAwesome className="arrow-highlight" name="caret-down"/></div> : <div className="sorting-arrows"><FontAwesome className="arrow-highlight" name="caret-up"/><FontAwesome name="caret-down"/></div>) : <div className="sorting-arrows"><FontAwesome name="caret-up"/><FontAwesome name="caret-down"/></div>} 

          </a>

          { date
            ?
            <input type="number" className="search" onChange={this.onFilter} placeholder="Search by Year"/>
            :
            <input type="text" className="search" onChange={this.onFilter} placeholder="Search"/>
          }

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
module.exports.SortHeaderCell = SortHeaderCell;

class TextCell extends Component {
  render() {
    const {rowIndex, data, columnKey, keys, openCert, certificates, currentColumn, date, ...props} = this.props;
    // console.log(columnKey);
    let statusClass;
    let calcPlayerAge;
    if(data[keys[rowIndex]]){
      statusClass = data[keys[rowIndex]]["status"].toLowerCase();  
      if(statusClass === 'deceased'){
          calcPlayerAge = getAge(data[keys[rowIndex]]['birthDate'], data[keys[rowIndex]]['deathDate']);
      }
    }
    return (
      <Cell {...props} 
      className={keys.includes('none') ? "noPlayers" : currentColumn === columnKey ? statusClass + " active-column" : statusClass}
      >

        { keys.includes('none') ? "-" : date ? dateToText(data[keys[rowIndex]][columnKey]) : columnKey === 'age' ? calcPlayerAge : data[keys[rowIndex]][columnKey] }
        { keys.includes('none') ? "" : (columnKey === "birthDate") && (Object.keys(certificates.birth).map((certificateName) => certificateName.includes(slug(data[keys[rowIndex]]['name']))).includes(true)) ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
        { keys.includes('none') ? "" : (columnKey === "deathDate") && (Object.keys(certificates.death).map((certificateName) => certificateName.includes(slug(data[keys[rowIndex]]['name']))).includes(true)) ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
      </Cell>
    );
  }
};
module.exports.TextCell = TextCell;

class NameCell extends Component {
  render(){
    const {rowIndex, data, columnKey, playerNumber, keys, currentColumn, ...props} = this.props;
    let statusClass; 
    // console.log(data[keys[rowIndex]])
    if(data[keys[rowIndex]]){
      statusClass = data[keys[rowIndex]]["status"].toLowerCase();  
    }
  
    return(
      <div className="name">
        <div className="playerNumber">{rowIndex + 1}</div>

        <Cell {...props} 
        className={keys.includes('none') ? "noPlayers" : currentColumn === columnKey ? statusClass + " active-column" : statusClass}
        >

          {keys.includes('none') ? "NO PLAYERS FOUND" : data[keys[rowIndex]][columnKey]}
        </Cell>
      </div>
    );
    
  }
}

module.exports.NameCell = NameCell;