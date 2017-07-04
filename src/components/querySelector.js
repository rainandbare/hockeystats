import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchButtons } from '../actions/button_actions';

class QuerySelector extends Component {
	componentDidMount(){
		this.props.fetchButtons();
	}
	render(){
		console.log(this.props.buttons, 'from querySelector.js');
		const buttons = this.props.buttons;
		const keys = Object.keys(this.props.buttons);
		//for each item in the button array
		//return a button with tht name of the label
		return(
			<section className="querySelector">
				<form>
					{ keys.map(key => <label key={key} for={"input"+key}>{buttons[key]['buttonName']}<input name={"input"+key} type="checkbox"/></label>) }
					<input type="submit"></input>
				</form>
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
