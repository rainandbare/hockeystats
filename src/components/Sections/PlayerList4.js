


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell }  from 'fixed-data-table';

import { fetchPlayers, sortPlayers } from '../../actions/player_actions.js';
//import { fetchHeadings, addHeading, deleteHeading } from '../../actions/heading_actions.js';

import 'fixed-data-table/dist/fixed-data-table.min.css';

var FakeObjectDataListStore = require('../../../node_modules/fixed-data-table/examples/helpers/FakeObjectDataListStore.js');
//var RealObjectDataListStore = require('../Bits/maybeDataList.js');


var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

const TextCell = ({rowIndex, data, columnKey, playerKeys,  ...props}) => (
  <Cell {...props}>
    {//console.log(data, rowIndex, playerKeys)
    }
    {//data.getObjectAt(rowIndex)[columnKey]}
    }
  </Cell>
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class SortExample extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchPlayers();

    this._dataList = new FakeObjectDataListStore(2000);

    this._defaultSortIndexes = [];
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
    this.sortData = this.sortData.bind(this);
  }


  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._dataList.getObjectAt(indexA)[columnKey];
      var valueB = this._dataList.getObjectAt(indexB)[columnKey];
      var sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }
  sortData(sortIndexes){
    if (Object.keys(sortIndexes).length === 0 && this.props.players.list) {
      //sortIndexes = Object.keys(this.props.players.list)
      var players = this.props.players.list;
      const defaultSortIndexes = [];
      var size = players.length;
      for (var index = 0; index < size; index++) {
        defaultSortIndexes.push(this.props.players.list[index]);
      }
      console.log(defaultSortIndexes)




    }
    return sortIndexes
  }
  render() {
    var {sortedDataList, colSortDirs} = this.state;
    //console.log(this.props.players.list, "this.props.players.sortedDataList")
    //console.log(this.props.sortIndexes, "playersKeys")


    var playersKeys = this.sortData(this.props.sortIndexes);
    sortedDataList = this.props.players.list;


    //console.log(sortedDataList)
    //console.log(colSortDirs)
    return (
      <Table
        rowHeight={50}
        rowsCount={28}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="name"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.name}
              playersKeys={playersKeys}>
              name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} playersKeys={playersKeys} />}
          width={100}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.status}
              playersKeys={playersKeys}>
              Status
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} playersKeys={playersKeys}/>}
          width={200}
        />
        <Column
          columnKey="birthDate"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.lastName}
              playersKeys={playersKeys}>
              Last Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} playersKeys={playersKeys}/>}
          width={200}
        />
        <Column
          columnKey="deathDate"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.city}
              playersKeys={playersKeys}>
              City
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} playersKeys={playersKeys}/>}
          width={200}
        />
        <Column
          columnKey="deathCity"
          header={
            <SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.companyName}
              playersKeys={playersKeys}>
              Company Name
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} playersKeys={playersKeys} />}
          width={200}
        />
      </Table>
    );
  }
}

function mapStateToProps(state){
	return {
		players: state.players.sortedDataList,
		sortIndexes: state.players.colSortDirs,
		// headings: state.headings,
		// buttons: state.buttons,
		// certificates: state.certificates,
		// searchTerm: state.searchTerm
	}
}


export default connect(mapStateToProps, { fetchPlayers, sortPlayers })(SortExample);
