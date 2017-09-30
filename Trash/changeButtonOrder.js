import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import DeleteButton from '../Bits/deleteButton';

import { fetchButtons } from '../../actions/button_actions';

import '../Sections/querySelector.css';
import sortArrays from '../../functions/sortArrays.js';

class ChangeButtonOrder extends Component {
	constructor(props){
		super(props);
		this.state = {
			buttons : [],
		};
		this.onSortEnd = this.onSortEnd.bind(this);

	}
	componentDidMount(){
		this.props.fetchButtons();
	}
	onSortEnd(info, event){
		// const keys = Object.keys(this.props.buttons);
		// const initialbuttonOrder = Object.values(this.props.buttons).map((button) => (button.order))
		// const sortedButtons = sortArrays(keys, initialbuttonOrder)
		// const newArray = arrayMove(sortedButtons, info.oldIndex, info.newIndex);
		// for (var i = newArray.length - 1; i >= 0; i--) {
		// 	this.props.changeOrder(newArray[i], i)
		// }
		// this.setState({
		// 	buttons : newArray
		// })
  	}

	render(){
		const buttons = this.props.buttons;
		const keys = Object.keys(this.props.buttons);
		const buttonsSelected = this.state.buttons
		const url = buttonsSelected.join('-');
		return(
			<section className="querySelector">
				<ul className="queryOptions flexMe">
				<form onSubmit={handleSubmit(this.onSortEnd)}>
				{ keys.map((key) => {
						return(
							<li key={key} className="flexMe">
								{ 
									 buttons[key]['buttonLabel'] !== 'all'
									 ?
									 <DeleteButton index={key} />
									 :
									 <DeleteButton disabled={'disabled'} index={key} />
								}
								<h6>{buttons[key]['buttonName']}</h6>
								
								<p><input name={key} type="number" min="1" max={keys.length}/> out of <div> {keys.length}</div></p>
								<button className="button">Apply Order Change</button>

							</li>
						);
					})
				}
				</form>
				</ul>
			</section>
		);
	}
}


function mapStateToProps(state){
	return {
		buttons: state.buttons
	}
}

export default connect(mapStateToProps, { fetchButtons })(ChangeButtonOrder);


