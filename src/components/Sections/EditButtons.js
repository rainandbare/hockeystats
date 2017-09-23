import React, { Component } from 'react';
import AddEditButtons from '../Bits/addButtons';
import QuerySelector from '../Sections/QuerySelector.js';

class EditButtons extends Component {
	render(){
		return(
			<div>
				<QuerySelector edit="true"/>
				<AddEditButtons />
			</div>
		);
	}
}

export default EditButtons;