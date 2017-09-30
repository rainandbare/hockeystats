import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import $ from 'jquery';


import DeleteButton from '../Bits/deleteButton';

import { fetchButtons } from '../../actions/button_actions';
import sortArrays from '../../functions/sortArrays.js';
import './querySelector.css';

class QuerySelector extends Component {
	constructor(props){
		super(props);
		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.state = {
			buttons : [],
		};
	}
	componentDidMount(){
		this.props.fetchButtons();
	}
	onSelectionChange(e){
		//control all button vs other buttons
		const buttonsAll = this.props.buttons;
		const newButton = buttonsAll[e.target.name].buttonLabel;
		const currentButtons = this.state.buttons;

		if(currentButtons.indexOf(newButton) !== -1){
			const position = currentButtons.indexOf(newButton);
			currentButtons.splice(position, 1);
		} else {
			currentButtons.push(newButton);
		}
		let nextSetOfButtons = currentButtons;
		if(nextSetOfButtons.includes('all')){
			nextSetOfButtons = ["all"];
			$('input').prop('checked', false); 
			$('input.all').prop('checked', true)
		}
		this.setState({
			buttons: nextSetOfButtons,
		});
	}


	render(){
		const buttons = this.props.buttons;
		const keys = Object.keys(this.props.buttons);
		const order = Object.values(this.props.buttons).map((button) => {return button.order})
		const sortedKeys = sortArrays(keys, order);

		const buttonsSelected = this.state.buttons
		const url = buttonsSelected.join('-');
		return(
			<section className="querySelector">
				<ul className="queryOptions flexMe">
				{ sortedKeys.map((key) => {
						return(
							<li key={key} className="flexMe">
								{ 
									 buttons[key]['buttonLabel'] !== 'all'
									 ?
									 this.props.edit ? <DeleteButton index={key} /> : ""
									 :
									 this.props.edit ? <DeleteButton disabled={'disabled'} index={key} /> : ""
								}
								<h6>{buttons[key]['buttonName']}</h6>
								<input name={key} type="checkbox" id={key} className={buttons[key]['buttonLabel']} onChange={(e) => this.onSelectionChange(e)}/>
								<label htmlFor={key}>Toggle</label>
							</li>
						);
					})
				}
					<button className="go"><Link onClick={this.props.findPathName} to={`/results/${url}`}>GO</Link></button>
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

export default connect(mapStateToProps, { fetchButtons })(QuerySelector);
