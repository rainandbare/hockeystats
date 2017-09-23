import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/player_actions.js';

// import AddPlayerForm from '../Sections/AddNewPlayer';
import QuerySelector from '../Sections/QuerySelector';
import Title from '../Bits/title.js';
import EditList from '../Sections/EditList.js';

import _ from 'lodash';


class Edit extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			showForm: false,
		}
	}
	onToggleForm(value){
		this.setState({
			showForm: value,
		})
	}
	render() {
	    return (
	      <div className="edit-results results page">
	      	<Title text="Hello Andrew"/>
	      	<QuerySelector/>
	      	<EditList/>

	      </div>
	    );
	}
}

export default connect(null, { addPlayer })(Edit);
