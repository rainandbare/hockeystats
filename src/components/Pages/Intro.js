import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Into extends Component {
	render() {
	    return (
	      <div className="intro page">
	     	<h2>Intro Time</h2>
	     	<p>TO BE MADE...</p>
			<button className="go"><Link onClick={this.props.findPathName} to={"/home"}>HOME</Link></button>
	      </div>
	    );
	}
}

export default Into;
