import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import DeleteButton from '../Bits/deleteButton';

import { fetchButtons, changeOrder } from '../../actions/button_actions';

import '../Sections/querySelector.css';
import sortArrays from '../../functions/sortArrays.js';



const SortableItem = SortableElement(({value, onEdit}) =>
  <li>{value === 'All' ? <DeleteButton index={value} disabled='disabled'/> : <DeleteButton index={value} />} {value} <button onClick={() => onEdit(value)}>Edit</button></li>
);

const SortableList = SortableContainer(({items, info, all, names, onEdit}) => {
  return (
    <ul>
      {items.map((value, index, names) => {
        return (<SortableItem key={`item-${index}`} index={index} value={value} onEdit={onEdit} />);
      })}
    </ul>
  );
});


class ChangeButtonOrder extends Component {
	constructor(props){
		super(props);
		this.state = {
			buttonOrder : false,
		};
		this.onSortEnd = this.onSortEnd.bind(this);
		this.onEditButton = this.onEditButton.bind(this);
	}
	componentDidMount(){
		this.props.fetchButtons();
	}
	onSortEnd(info, event){
		const keys = Object.keys(this.props.buttons);
		const initialbuttonOrder = Object.values(this.props.buttons).map((button) => (button.order))
		const sortedButtons = sortArrays(keys, initialbuttonOrder)
		const newArray = arrayMove(sortedButtons, info.oldIndex, info.newIndex);
		for (var i = newArray.length - 1; i >= 0; i--) {
			this.props.changeOrder(newArray[i], i)
		}
		this.setState({buttons : newArray})
  	}
  	onEditButton(value){
  		this.props.onEditButtonClick(value);
		//const buttonData = this.props.players.list[this.props.playerID]
  	}
	render(){
			let buttonOrder = Object.values(this.props.buttons).map((button) => (button.order))
			
			if(this.state.buttonOrder !== false){
				buttonOrder = this.state.buttonOrder;
			}
			const buttonNames = Object.values(this.props.buttons).map((button) => (button.buttonName))
			const sortedButtonNames = sortArrays(buttonNames, buttonOrder)

			return(
				<section className="querySelector">
					
					<SortableList 
						items={sortedButtonNames} 
						onSortEnd={this.onSortEnd}
						onEdit={this.onEditButton}
						lockAxis='y'
						helperClass='sortableHelper'/>
				
				</section>
			);
	}
}


function mapStateToProps(state){
	return {
		buttons: state.buttons
	}
}

export default connect(mapStateToProps, { fetchButtons, changeOrder })(ChangeButtonOrder);


