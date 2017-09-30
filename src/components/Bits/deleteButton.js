import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteButton, changeOrder } from '../../actions/button_actions';


class DeleteButton extends Component {
	onDeleteButton(e){
		let target = '';
		if(e.target.localName === 'button'){
			target = e.target;
		} else if (e.target.localName === 'span'){
			console.log('spantastic')
			target = e.target.parentElement;
		} else {
			console.log('missed');
			return
		}
		if (Object.values(target.classList).includes('disabled') === false){
			var result = confirm("Delete Button?");
			if (result) {
				console.log(target.id)
				const buttonIndex = Object.values(this.props.buttons).map(button => button.buttonName).indexOf(target.id);
				const keys = Object.keys(this.props.buttons)
				const key = keys[buttonIndex];
				const keyOrder = this.props.buttons[key].order;


				this.props.deleteButton(key);
				for (var i = keys.length - 1; i >= 0; i--) {
					const order = this.props.buttons[keys[i]].order;
					console.log(order, keyOrder)
					if(order > keyOrder){
						const newOrder = order - 1;
						this.props.changeOrder(keys[i], newOrder );

					}
				}

				


			}
		}

	}
	render(){
		return(
				<button 
					id={this.props.index} 
					className={"delete " + this.props.disabled}
					onClick={(e) => this.onDeleteButton(e)}>
						&#x02A2F;
				</button>
		);
	}
}

function mapStateToProps(state){
	return {
		buttons: state.buttons
	}
}



export default connect(mapStateToProps, { deleteButton, changeOrder })(DeleteButton);

