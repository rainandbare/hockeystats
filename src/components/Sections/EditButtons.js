import React, { Component } from 'react';
import AddButtons from '../Bits/addButtons';
import ChangeButtonOrder from '../Bits/changeButtonOrder.js';

class EditButtons extends Component {
	constructor(props){
		super(props);
		this.state = {
			addButtons : false
		}
		this.openAddNewButton = this.openAddNewButton.bind(this);
		this.closeAddButton = this.closeAddButton.bind(this);
	}
	openAddNewButton(){
		this.setState({ addButtons: true })
	}
	closeAddButton(){
		this.setState({ addButtons: false })
	}

	render(){
		return(
			<div>
				<h2>Current Buttons</h2>
				<p>Drag to change order or click the x to Delete</p>
				<ChangeButtonOrder />
				{this.state.addButtons 
					? 
					<AddButtons actionCompleted={this.closeAddButton}/> 
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