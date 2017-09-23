import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import AddEditButtons from '../Bits/addButtons';
import DeleteButton from '../Bits/deleteButton';

import { fetchButtons } from '../../actions/button_actions';

import './querySelector.css';

class QuerySelector extends Component {
	constructor(props){
		super(props);
		this.onSelectionChange = this.onSelectionChange.bind(this);
		//this.addClassToButtons = this.addClassToButtons.bind(this);

		this.state = {
			buttons : [],
		};

	}
	componentDidMount(){
		this.props.fetchButtons();
	}
	componentWillUpdate(){
		//this.addClassToButtons();
	}
	onSelectionChange(e){
		
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
		// console.log(buttons)
		const keys = Object.keys(this.props.buttons);
		const buttonsSelected = this.state.buttons
		const url = buttonsSelected.join('-');

		//for each item in the button array
		//return a button with tht name of the label
		return(
			<section className="querySelector">
				<ul className="queryOptions flexMe">
				{ keys.map((key) => {
						return(
							<li key={key} className="flexMe">
								<h6>{buttons[key]['buttonName']}</h6>
								<input name={key} type="checkbox" id={key} className={buttons[key]['buttonLabel']} onChange={(e) => this.onSelectionChange(e)}/>
								<label htmlFor={key}>Toggle</label>

								{ 
									 buttons[key]['buttonLabel'] !== 'all'
									 ?
									 this.props.edit ? <DeleteButton index={key} /> : ""
									 :
									 ""
								}
							</li>
						);
					})
				}
					<button><Link onClick={this.props.findPathName} to={`/results/${url}`}>GO</Link></button>
				</ul>

				{
					//on form submit
					//go to url /selected/**buttonName&buttonName&buttonName
					//at selectedresults.js - get url (ie buttonNames) and get an array of all the columns that those buttons include
					//display chart with only those columns
				}

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
