import React, { Component } from 'react';

import './toggleCheckbox.css'

class ScrollToggle extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(e){
  	this.props.onToggle(e.target.checked, this.props.numheadings);
  }
  render(){
  	return(
  		<div className="toggleCheckbox">
  			<h6>Scroll With Arrow Keys</h6>
	        <input name='arrowKeys' type="checkbox" id='arrowKeys' onChange={(e) => this.onToggle(e)}/>
	        <label htmlFor='arrowKeys'>Toggle</label>
  		</div>

  		);
  }
}
export default ScrollToggle;