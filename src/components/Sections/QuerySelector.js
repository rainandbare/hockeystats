import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import AddEditButtons from '../Bits/addButtons';
import DeleteButton from '../Bits/deleteButton';

import { fetchButtons } from '../../actions/button_actions';

class QuerySelector extends Component {
	constructor(props){
		super(props);
		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.addClassToButtons = this.addClassToButtons.bind(this);

		this.state = {
			buttons : [],
		};

	}
	componentDidMount(){
		this.props.fetchButtons();
	}
	componentWillUpdate(){
		this.addClassToButtons();
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
		this.setState({
			buttons: currentButtons,
		});
	}
	addClassToButtons(){
		const currentSelection = this.state.buttons
		console.log(currentSelection)
		$("[id^='button-']").removeClass('checked')
		currentSelection.map((button) => {
			$('#button-' + button).addClass('checked')
		})
	// 	console.log($('ul.queryOptions input'))
	// 	$('ul.queryOptions input').on('change', function(){
	// 		console.log('listening')
	// 	})
	// 		// .parent('label').addClass('checked')
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
							<li key={key}>
								<label id={"button-" + buttons[key]['buttonLabel']} onChange={(e) => this.onSelectionChange(e)}>{buttons[key]['buttonName']}
									<input name={key} type="checkbox"/>
								</label>
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
					<button><Link onClick={this.props.findPathName} to={`/selected/${url}`}>GO</Link></button>
				</ul>

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
