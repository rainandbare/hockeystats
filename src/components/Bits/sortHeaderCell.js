import React, { Component } from 'react';
import { Cell }  from 'fixed-data-table';

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

export default SortHeaderCell;



