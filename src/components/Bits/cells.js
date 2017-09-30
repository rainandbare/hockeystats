import React, { Component } from 'react';
import { Cell }  from 'fixed-data-table-2';
import FontAwesome from 'react-fontawesome';
import slug from '../../functions/slug.js';

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
    var {onSortChange, onFilter, sortDir, children, playersKeys, ...props} = this.props;
    return (
        <Cell {...props}>
          <a onClick={this.onSortChange}>
            {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''} 
          </a>
          <input type="search" className="search" onChange={this.onFilter} placeholder="Search"/>
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
    const {rowIndex, data, columnKey, keys, openCert, certificates, ...props} = this.props;
    return (
      <Cell {...props} className={data[keys[rowIndex]]["status"].toLowerCase()}>
        {data[keys[rowIndex]][columnKey]}
        { (columnKey === "birthDate") && (Object.keys(certificates.birth).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
        { (columnKey === "deathDate") && (Object.keys(certificates.death).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => this.props.openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
      </Cell>
    );
  }
};
module.exports.TextCell = TextCell;

class NameCell extends Component {
  render(){
    const {rowIndex, data, columnKey, playerNumber, keys, ...props} = this.props;
    return(
      <div className="name">
        <div className="playerNumber">{rowIndex + 1}</div>
        <Cell {...props} className={data[keys[rowIndex]]["status"].toLowerCase()}>
          {data[keys[rowIndex]][columnKey]}
        </Cell>
      </div>
    );
    
  }
}

module.exports.NameCell = NameCell;