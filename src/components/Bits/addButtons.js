import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addButton, editButton } from '../../actions/button_actions.js';


class AddEditButtons extends Component {
	constructor(props){
		super(props);

		this.handleInitialize = this.handleInitialize.bind(this);
		this.renderField = this.renderField.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
  		this.handleInitialize();
	}
	handleInitialize() {
		if(this.props.edit !== false){
			const keys = Object.keys(this.props.buttons);
			const buttonKey = keys.filter(key => this.props.buttons[key].buttonName === this.props.edit);
			const buttonData = this.props.buttons[buttonKey].columns;
			buttonData['buttonName'] = this.props.edit;
			// console.log(this.props);
		  	this.props.initialize(buttonData);
		}
	}
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
		//console.log(values);
		if(this.props.edit === false){
			const order = Object.keys(this.props.buttons).length;
			this.props.addButton(values, order);
			this.props.actionCompleted();
		} else {
			const buttonKey = Object.keys(this.props.buttons).filter(key => this.props.buttons[key].buttonName === this.props.edit);
			const order = this.props.buttons[buttonKey].order;
			this.props.editButton(buttonKey, values, order);
			this.props.actionCompleted();
		}
		
	}
	render(){
		const headings = this.props.headings;
		const { handleSubmit } = this.props;
		const keys = Object.keys(headings);
		return(
			<form className='addButtonForm' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className="half">
					<h2>{this.props.edit ? "Edit Button" : "Add New Button"}</h2>
					<Field
						key='name'
						name="buttonName"
						label="Button Name"
						type="text"
						component={this.renderField}
					/>
					<h4>Check all the columns you want to include in Button</h4>
				</div>
				<div className="half flexMe">
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
				</div>
				<button className="button" type="submit">{this.props.edit ? "Edit Button" : "Add Button"}</button>
			</form>
			);
	}
}

function validate(values){
	const errors = {};

	if (!values.name) {
		errors.name = "Enter a name for the Button.";
	}
	return errors;

}

function mapStateToProps(state){
	return {
		headings: state.headings,
		buttons: state.buttons
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ addButton, editButton }, dispatch);
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


