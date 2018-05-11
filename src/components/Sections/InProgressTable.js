import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, Cell }  from 'fixed-data-table-2';
import { SimpleCell } from '../Bits/cells.js'
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import { fetchInProgress } from '../../actions/inprogress_action.js';

import sortPlayerKeys from '../../functions/sortPlayerKeys';
import multipleSortPlayerKeys from '../../functions/multipleSortPlayerKeys';

import './inProgressTable.css';

class InProgressTable extends Component {
	constructor(props){
	  	super(props);
	  	this.props.fetchInProgress();

	  	this.state = {
	  		width: 1200,
        	height: 550
	  	}
	  	this.onRowClick = this.onRowClick.bind(this);
	  	this.getTableWidth = this.getTableWidth.bind(this);
	}
	componentDidMount(){
	    window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillMount(){
		this.updateDimensions();
	}
	componentWillUnmount() {
	    window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	updateDimensions(){
	    if ((window.innerWidth < 767) && (window.innerWidth > window.innerHeight)){
	      //if it is mobile landscape
	      let update_width  = window.innerWidth-40;
	      let update_height = window.innerHeight*3;
	      this.setState({ width: update_width, height: update_height });
	    } else if(window.innerWidth < 767){
	      //if it is mobile
	      let update_width  = window.innerWidth-40;
	      let update_height = window.innerHeight-150;
	      this.setState({ width: update_width, height: update_height });
	    } else {
	      let update_width  = window.innerWidth-80;
	      let update_height = window.innerHeight-150;
	      this.setState({ width: update_width, height: update_height });
	    }
	}
	onRowClick(event, rowIndex){
		const type = this.props.type;
	    const data = this.props.inProgress[type].entries;
	    const keys = this.sortIndexes(Object.keys(this.props.inProgress[type].entries), this.props.inProgress[type].entries);
	    this.props.openEditForm(event, rowIndex, data, keys, type)
  	}
  	sortIndexes(keys, entries){
  		if(this.props.type !== "find"){
  			return sortPlayerKeys('name', 'DESC', keys, entries);
  		} else {
  			const columnKeyArray = ['possibleDeathProvState', 'possibleDeathCity', 'name'];
  			return multipleSortPlayerKeys(columnKeyArray, 'DESC', keys, entries);
  		}
  	}
  	getTableWidth(headings){
  		const fullWidth = 	headings.map(heading => heading.width)
									.reduce((accumulator, currentValue) => accumulator + currentValue);
		if(fullWidth > this.state.width){
			return this.state.width;
		} else {
			return fullWidth;
		}
  	}
	render() {
		const type = this.props.type;
		if(this.props.inProgress[type]){
			const inProgress = this.props.inProgress[type].entries;
			const keys = this.sortIndexes(Object.keys(inProgress), inProgress);
			const headings = this.props.inProgress[type].headings;
			const rowCount = keys.length;
			const tableWidth = this.getTableWidth(headings);
		    return (
		      <div className={type + " inProgressTable"}>
		      	<Table
				    rowHeight={40}
				    rowsCount={rowCount}
				    touchScrollEnabled={true}
				    width={tableWidth}
            		height={this.state.height}
            		onRowClick={this.onRowClick}
				    headerHeight={30}
				    {...this.props}>
				    {headings.map(heading => {
				    	return(
						    <Column
						    	key={heading.label}
						      	header={<Cell>{heading.label}</Cell>}
						      	cell={<SimpleCell data={inProgress} keys={keys} column={heading.name}/>}
						      	width={heading.width}
						      	flexGrow={1}
						    />
					    );
				    })}
				</Table>
		      </div>
		    );
		} else {
			return(
				<div className="svg-loader-container">
					...
			    </div>
			);
		}
	}
}

function mapStateToProps(state){
	return {
		inProgress: state.inProgress,
	}
}


export default connect(mapStateToProps, { fetchInProgress })(InProgressTable);