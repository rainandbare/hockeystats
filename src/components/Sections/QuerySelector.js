import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import AddEditButtons from '../Bits/addButtons';
import DeleteButton from '../Bits/deleteButton';

import { fetchButtons } from '../../actions/button_actions';

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
		//console.log(e.target.name);
		const buttonsAll = this.props.buttons;
		const newButton = buttonsAll[e.target.name].buttonLabel;
		//console.log(buttonLabel);
		const currentButtons = this.state.buttons;
		if(currentButtons.indexOf(newButton) !== -1){
			const position = currentButtons.indexOf(newButton);
			currentButtons.splice(position, 1);
		} else {
			currentButtons.push(newButton);
		}
		this.setState({
			buttons: currentButtons,
		});
		//console.log(this.state.buttons)
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
				{ keys.map((key) => {
						//console.log(buttons[key]);
						if(buttons[key]['buttonLabel'] === "all"){
							return(
								<div key={key}>
									<label id="" onChange={(e) => this.onSelectionChange(e)}>{buttons[key]['buttonName']}
										<input name={key} type="checkbox"/>
									</label>
								</div>
							);
						} else {
							return(
								<div key={key}>
									<label id="" onChange={(e) => this.onSelectionChange(e)}>{buttons[key]['buttonName']}
										<input name={key} type="checkbox"/>
									</label>
									{this.props.edit ? <DeleteButton index={key} /> : ""}
								</div>
							);
						}
					})
				}
				<button><Link to={`/selected/${url}`}>GO</Link></button>

				{
					//on form submit
					//go to url /selected/**buttonName&buttonName&buttonName
					//at selectedresults.js - get url (ie buttonNames) and get an array of all the columns that those buttons include
					//display chart with only those columns
				}
				{this.props.edit ? <AddEditButtons/> : ""}

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
