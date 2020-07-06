import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './controls.css'

class Controls extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  onToggle(e){
  	this.props.onToggle(e.target.checked, this.props.numheadings);
  }
  onClear(){
    this.props.onClear();
  }
  render(){
  	return(
      <div className="controls flexMe">
        <div>
        <button className="clearAllSearchs" onClick={this.onClear}>
          Clear All Searches
        </button>
    		<div className="toggleCheckbox">
    			<h6><FontAwesome name="arrows"/> Keyboard Arrow Key Scroll</h6>

  	        <input name='arrowKeys' type="checkbox" id='arrowKeys' onChange={(e) => this.onToggle(e)}/>
  	        <label htmlFor='arrowKeys'>Toggle</label>
    		</div>
        </div>
        <div className="legend flexMe">
            <h6>Legend</h6>
            <ul>
              <li className="active">Active</li>
              <li className="retired">Retired</li>
              <li className="deceased">Deceased</li>
              <li><span className="certDot"><span aria-hidden="true" className="fa fa-circle"></span></span> = Click on grey dot to view extra birth or death info (articles, certificates)</li>
            </ul>
        </div>
      </div>

  		);
  }
}
export default Controls;