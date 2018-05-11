import React, { Component } from 'react';
import AddButtons from '../Bits/addButtons';
import ChangeButtonOrder from '../Bits/changeButtonOrder.js';

class EditButtons extends Component {
	constructor(props){
		super(props);
		this.state = {
			addButtons : false,
			edit : false
		}
		this.openAddNewButton = this.openAddNewButton.bind(this);
		this.closeAddButton = this.closeAddButton.bind(this);
		this.openEditButton = this.openEditButton.bind(this);
	}
	openAddNewButton(){
		this.setState({ addButtons: true })
	}
	closeAddButton(){
		this.setState({ addButtons: false })
	}
	openEditButton(value){
		this.setState({ addButtons: true, edit: value })
	}

	render(){
		return(
			<div>
				<h2>Current Buttons</h2>
				<p>Drag to change order, click the x to Delete or choose Edit to change columns shown</p>
				<ChangeButtonOrder onEditButtonClick={this.openEditButton}/>
				{this.state.addButtons 
					? 
					<AddButtons edit={this.state.edit} actionCompleted={this.closeAddButton}/> 
					: 
					<button 
						className="button" 
						onClick={this.openAddNewButton}>Add New Button</button>}
				
				<button className="button" onClick={this.props.actionComplete}>Done</button>
			</div>
		);
	}
}

export default EditButtons;