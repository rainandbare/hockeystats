import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addButton } from '../../actions/button_actions.js';


class AddEditButtons extends Component {
	renderField(field){
		const className = `form ${field.class} ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className} key={field.key}>
				<label>{field.label}: 
				<input 
					name={field.name}
					type={field.type}
					{...field.input}
				/>
				</label>
				<div className="red-text">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
		
	}
	onSubmit(values){
		// console.log(values);
		this.props.addButton(values);
		
	}
	render(){
		const headings = this.props.headings;
		const { handleSubmit } = this.props;
		const keys = Object.keys(headings);
		return(
			
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h2>Add New Button</h2>
				<Field
					key='name'
					name="buttonName"
					label="Button Name"
					type="text"
					component={this.renderField}
				/>
				<h4>Check all the columns you want to include in Button</h4>
				{	keys.map((i) => {
						if(headings[i].name !== "name"){
							return (
								<Field
									key={headings[i].name}
									name={headings[i].name}
									label={headings[i].label}
									type="checkbox"
									component={this.renderField}  
								/>
							);
						} else if (headings[i].name === "name"){
							return (
								<Field
									key={headings[i].name}
									name={headings[i].name}
									label={headings[i].label}
									type="checkbox"
									component={this.renderField}   
									class="hide"
								/>
							);
						};
						return(<div></div>);
					})
				}
			<button className="button" type="submit">Add Button</button>
			</form>
			);
	}
}

// class ArrayCheckbox extends Component {
// 	render(){
// 		const headings = this.props.headings;
// 		const i = this.props.i;
// 		return(
// 			<label onChange={() => this.props.handleChange(headings[i].name)} key={headings[i].name}>{headings[i].label}
// 				<input
// 					name="columns"
// 					id={headings[i].name}
// 					value={headings[i].name}
// 					type="checkbox"
// 				/>
// 			</label>
// 		);
// 	}
// }

function validate(values){
	const errors = {};

	if (!values.name) {
		errors.name = "Enter a name for the Button.";
	}
	return errors;

}

function mapStateToProps(state){
	return {
		headings: state.headings
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ addButton }, dispatch);
}


export default reduxForm({
	validate,
	form: "AddButton",
	initialValues:{
		name: true
	}

})(
	connect(mapStateToProps,  mapDispatchToProps)(AddEditButtons)
);



// AddEditButtons = reduxForm({
//     form:'AddButtons'
// })(AddEditButtons)


// const selector = formValueSelector('AddButtons') // <-- same as form name
// AddEditButtons = connect(
  // state => ({
  // 	headings: state.headings
  // 	const { columns } = selector(state, 'firstName')
  // 	return {
  // 		fullName: `${firstName || ''} ${lastName || ''}`
  // 	}
    
  // })              
// )(AddEditButtons)

// export default AddEditButtons;




