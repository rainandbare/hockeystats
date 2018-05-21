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

export default class SortHeaderCell extends Component {
  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    
    this.timeout = null;

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
            <input type="number" className="search" onKeyUp={this.onFilter} placeholder="Search by Year"/>
            :
            <input type="text" className="search" onKeyUp={this.onFilter} placeholder="Search"/>
          }

        </Cell>

    );
  }
  onFilter(e){    
     //only  trigger filter if a certain number of milliseconds have passed and no new changes have been made to the input
       clearTimeout(this.timeout);
       // Make a new timeout set to go off in 300ms
       const term = e.target.value;
       const columnKey = this.props.columnKey;
       this.timeout = setTimeout(() => {
           if (this.props.onFilter) {
               this.props.onFilter(term, columnKey)
             }
       }, 300);
  }

  onSortChange(e) {
    e.preventDefault();
    if (this.props.onSortChange) {
      this.props.onSortChange( this.props.columnKey, this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC, this.props.playersKeys);
    }
  }
}

export class TextCell extends Component {
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
        //console.log(slug(data[keys[rowIndex]]['name']));
        // Object.keys(certificates.death).map((certificateName) => {
        //   if(slug(data[keys[rowIndex]]['name']) === certificateName){
        //     //console.log(slug(data[keys[rowIndex]]['name']));
        //   }
        // });
        //columnKey === 'age' ? calcPlayerAge : 
    return (
      <Cell {...props} 
      className={keys.indexOf('none') !== -1 ? "noPlayers" : currentColumn === columnKey ? statusClass + " active-column" : statusClass}
      >
        { keys.indexOf('none') !== -1 ? "-" : date ? dateToText(data[keys[rowIndex]][columnKey]) : data[keys[rowIndex]][columnKey] }
        { 
          keys.indexOf('none') !== -1
          ? "" 
          : (columnKey === "birthDate") && (data[keys[rowIndex]]['hasBirthCert']) 
            ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> 
            : "" 
        }
        { 
          keys.indexOf('none') !== -1
          ? "" 
          : (columnKey === "deathDate") && (data[keys[rowIndex]]['hasDeathCert']) 
            ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> 
            : "" 
        }
      </Cell>
    );
  }
};


export class NameCell extends Component {
  render(){
    const {rowIndex, data, columnKey, playerNumber, keys, currentColumn, ...props} = this.props;
    let statusClass; 
    if(data[keys[rowIndex]]){
      statusClass = data[keys[rowIndex]]["status"].toLowerCase();  
    }
  
    return(
      <div className="name">
        <div className="playerNumber">{rowIndex + 1}</div>

        <Cell {...props} 
        className={keys.indexOf('none') !== -1 ? "noPlayers" : currentColumn === columnKey ? statusClass + " active-column" : statusClass}
        >

          {keys.indexOf('none') !== -1 ? "NO PLAYERS FOUND" : data[keys[rowIndex]][columnKey]}
        </Cell>
      </div>
    );
    
  }
}

export class SimpleCell extends Component {
  render() {
    const {rowIndex, data, keys, column, ...props} = this.props;
        // console.log(data[keys[rowIndex]][column]);
        //console.log(slug(data[keys[rowIndex]]['name']));
        //console.log(Object.keys(certificates.death).map((certificateName) => certificateName));
    return (
      <Cell {...props} >
        {data[keys[rowIndex]][column]}
      </Cell>
    );
  }
};


