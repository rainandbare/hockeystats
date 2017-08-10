import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

 

import { deleteButton } from '../../actions/button_actions';


class DeleteButton extends Component {
	onDeleteButton(e){
		const id = e.target.id;
		this.props.deleteButton(id)
	}
	render(){
		return(
			<div>
				<button 
					id={this.props.index} 
					onClick={(e) => this.onDeleteButton(e)}>
						Delete Button
				</button>
			</div>
			
		);
	}
}



export default connect(null, { deleteButton })(DeleteButton);

